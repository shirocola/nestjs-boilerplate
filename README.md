# NestJS Boilerplate Project

## Table of Contents
- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Project Setup](#project-setup)
- [Testing](#testing)
  - [Unit Tests](#unit-tests)
  - [Integration Tests](#integration-tests)
  - [End-to-End Tests](#end-to-end-tests)
- [Deployment](#deployment)
  - [Docker and Docker Compose](#docker-and-docker-compose)
  - [Kubernetes Deployment](#kubernetes-deployment)
  - [Continuous Integration with Azure Pipelines](#continuous-integration-with-azure-pipelines)
  - [Continuous Deployment with ArgoCD](#continuous-deployment-with-argocd)
- [Infrastructure Provisioning with Terraform](#infrastructure-provisioning-with-terraform)
- [Monitoring with Datadog](#monitoring-with-datadog)
- [Documentation with Swagger](#documentation-with-swagger)
- [Integration with Backstage](#integration-with-backstage)
- [Best Practices](#best-practices)
- [Contributing](#contributing)
- [License](#license)

## Introduction
This project is a NestJS boilerplate designed to meet enterprise-level requirements, following best practices and incorporating modern technologies. It includes features such as:

- TypeORM with PostgreSQL for database operations.
- Docker and Docker Compose for containerization.
- Kubernetes deployment manifests.
- Azure DevOps for CI/CD pipelines.
- ArgoCD for continuous deployment.
- Terraform for infrastructure as code.
- Datadog for monitoring and performance tracking.
- Swagger for API documentation.
- Backstage for service cataloging and documentation.
- Testing suite with unit, integration, and end-to-end tests.
- OOP and SOLID principles applied throughout the codebase.
- Dependency Injection leveraged via NestJS's built-in system.

## Technologies Used
- **Node.js** (Latest LTS version)
- **NestJS** (Framework)
- **TypeORM** (ORM)
- **PostgreSQL** (Database)
- **Docker and Docker Compose**
- **Kubernetes**
- **Azure DevOps** (Azure Pipelines, Azure Repos)
- **ArgoCD** (Continuous Deployment)
- **Terraform** (Infrastructure as Code)
- **Datadog** (Monitoring)
- **Swagger** (API Documentation)
- **Backstage** (Service Catalog)
- **Jest** (Testing Framework)

## Prerequisites
- **Node.js** (v18.x LTS)
- **npm** (Comes with Node.js)
- **Docker** (Latest version)
- **Docker Compose** (Latest version)
- **Kubernetes Cluster** (e.g., Azure Kubernetes Service)
- **Azure Account** (For Azure DevOps and other services)
- **Terraform** (Latest version)
- **Datadog Account** (For monitoring)
- **Backstage** (Set up according to Backstage documentation)

## Project Setup
1. **Clone the Repository**
    ```bash
    git clone https://github.com/yourusername/nestjs-boilerplate.git
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Environment Configuration**
    Create a `.env` file in the root directory and populate it with your environment variables:
    ```bash
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=postgres
    DB_PASSWORD=yourpassword
    DB_DATABASE=mydatabase
    PORT=3000
    ```

4. **Database Setup**
    Ensure you have a PostgreSQL database running and accessible with the credentials specified in your `.env` file. Alternatively, you can use Docker Compose to spin up a PostgreSQL container (explained in the Docker section).

5. **Run the Application**
    ```bash
    npm run start:dev
    ```
    The application will start on [http://localhost:3000](http://localhost:3000).

## Testing

### Unit Tests

```bash
npm run test
```

**Description**: Unit tests are located in the `test/` directory and are responsible for testing individual components like services and controllers.

### Integration Tests

```bash
npm run test:integration
```

**Description**: Integration tests test the interaction between different parts of the application, such as the service and the database.

### End-to-End Tests

```bash
npm run test:e2e
```

**Description**: End-to-end tests simulate user interactions with the API, testing the application from the user's perspective.

## Deployment

### Docker and Docker Compose

**Build the Docker Image**

```bash
docker build -t yourdockerhubusername/nestjs-boilerplate:latest .
```

**Run with Docker Compose**

```bash
docker-compose up
```

### Kubernetes Deployment

Kubernetes Deployment and Service Manifests are located in the `k8s/` directory.

**Apply Kubernetes manifests**

```bash
kubectl apply -f k8s/
```

### Continuous Integration with Azure Pipelines

- **Pipeline File**: `azure-pipelines.yml`
- **Steps Included**:
  - Install Node.js
  - Install Dependencies
  - Build Application
  - Build and Push Docker Image
  - Generate OpenAPI Spec
  - Publish Build Artifacts

### Continuous Deployment with ArgoCD

- **ArgoCD Application Manifest** is located in the `argocd/` directory.

**Register Application with ArgoCD**

```bash
kubectl apply -f argocd/application.yaml
```

## Infrastructure Provisioning with Terraform

- **Main Configuration**: `terraform/main.tf`

**Initialize and Apply Terraform**

```bash
cd terraform
terraform init
terraform plan
terraform apply
```

This will provision the necessary Azure resources, including:

- Resource Group
- AKS Cluster
- PostgreSQL Server and Database

## Monitoring with Datadog

### Setup

- Datadog Agent is included in the `docker-compose.yml` and Kubernetes manifests.
- Datadog APM is integrated into the application via the `dd-trace` package.

### Environment Variables

Ensure the following environment variables are set:

```bash
DD_API_KEY=your_datadog_api_key
DD_APM_ENABLED=true
```

### Datadog Integration in Application

```typescript
// main.ts
import 'dd-trace/init'; // Must be imported before anything else

async function bootstrap() {
  // Your bootstrap code
}
bootstrap();
```

## Documentation with Swagger

### Accessing Swagger UI

After starting the application, navigate to:

```bash
http://localhost:3000/api-docs
```

## Integration with Backstage

### Catalog Info File

- **File**: `catalog-info.yaml`

**Registering with Backstage**:

1. Ensure Backstage is set up according to the Backstage documentation.
2. Add the `catalog-info.yaml` file to your repository.
3. In Backstage, register the component by providing the URL to the `catalog-info.yaml`.

## Best Practices

- **OOP and SOLID Principles**: Applied throughout the codebase for maintainability and scalability.
- **Dependency Injection**: Leveraged via NestJS's built-in system for better modularity.
- **RESTful API Design**: Controllers and routes follow REST principles.
- **Testing**: Comprehensive testing strategy with unit, integration, and end-to-end tests.
- **CI/CD**: Automated pipelines for building, testing, and deploying the application.
- **Infrastructure as Code**: Terraform used for consistent environment provisioning.
- **Monitoring and Observability**: Datadog integrated for performance monitoring.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Open a pull request.

**Note**: Replace placeholder values like `yourpassword`, `your_datadog_api_key`, `yourdockerhubusername`, and `yourusername` with your actual credentials and usernames.

## License

This project is licensed under the [MIT License](LICENSE).

