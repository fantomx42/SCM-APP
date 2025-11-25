'use server'

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma" // We need to create this singleton
import { encrypt, decrypt } from "@/lib/crypto"
import { revalidatePath } from "next/cache"

export async function saveSimulation(data: {
    name: string;
    settings: any;
    results: any; // This will be encrypted
}) {
    const session = await auth()
    if (!session?.user?.id) {
        throw new Error("Unauthorized")
    }

    // Encryption
    const resultsString = JSON.stringify(data.results)
    const { content: encryptedResults, iv } = encrypt(resultsString)

    const simulation = await prisma.simulation.create({
        data: {
            name: data.name,
            settings: data.settings,
            encryptedResults,
            resultsIv: iv,
            userId: session.user.id,
            status: "COMPLETED"
        }
    })

    revalidatePath('/dashboard')
    return simulation
}

export async function getSimulations() {
    const session = await auth()
    if (!session?.user?.id) {
        throw new Error("Unauthorized")
    }

    // Content Isolation: Only fetch simulations for the current user
    const simulations = await prisma.simulation.findMany({
        where: {
            userId: session.user.id
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return simulations
}

export async function getSimulation(id: string) {
    const session = await auth()
    if (!session?.user?.id) {
        throw new Error("Unauthorized")
    }

    const simulation = await prisma.simulation.findUnique({
        where: {
            id
        }
    })

    if (!simulation) return null

    // Content Isolation: Ensure the simulation belongs to the user
    if (simulation.userId !== session.user.id) {
        throw new Error("Forbidden")
    }

    // Decryption
    let results = null
    if (simulation.encryptedResults && simulation.resultsIv) {
        try {
            // Reconstruct the format expected by decrypt (iv:authTag:content)
            // Wait, my encrypt function returns content as "iv:authTag:ciphertext"
            // So I just need to pass that string to decrypt.
            // But wait, I stored `encryptedResults` as the content string.
            // Let's check my crypto.ts implementation.
            // encrypt returns { content: "iv:authTag:encrypted", iv: "iv" }
            // So simulation.encryptedResults holds the full string.
            const decryptedString = decrypt(simulation.encryptedResults)
            results = JSON.parse(decryptedString)
        } catch (error) {
            console.error("Failed to decrypt simulation results", error)
            // Handle error gracefully, maybe return partial data
        }
    }

    return {
        ...simulation,
        results // Return decrypted results
    }
}
