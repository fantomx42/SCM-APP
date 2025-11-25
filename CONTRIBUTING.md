# Contributing to Symbolic Lab

Thank you for your interest in contributing to Symbolic Lab! We welcome contributions from everyone.

## Development Workflow

We use a feature-branch workflow.

1. **Fork and Clone**: Fork the repository and clone it locally.
2. **Create a Branch**: Create a new branch for your feature or bugfix.

    ```bash
    git checkout -b feature/my-new-feature
    # or
    git checkout -b fix/my-bug-fix
    ```

3. **Make Changes**: Write your code and tests.
4. **Commit**: Commit your changes using [Conventional Commits](https://www.conventionalcommits.org/).

    ```bash
    git commit -m "feat: add new symbolic fusion algorithm"
    ```

5. **Push**: Push your branch to your fork.
6. **Pull Request**: Open a Pull Request against the `main` branch.

## Coding Standards

- **TypeScript**: We use TypeScript for type safety. Ensure no `any` types are used unless absolutely necessary.
- **Linting**: Run `npm run lint` before committing to ensure code style compliance.
- **Formatting**: We use Prettier. Run `npm run format` to auto-format your code.

## Pull Request Process

- Fill out the PR template completely.
- Ensure all tests pass.
- Link related issues.
- Request a review from a maintainer.

## Reporting Issues

Please use the provided issue templates for bug reports and feature requests.
