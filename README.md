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
    git clone https://github.com/yourusername/my-nestjs-app.git
    cd my-nestjs-app
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Environment Configuration**
    Create a `.env` file in the root directory and populate it with your environment variables:
    ```dotenv
    # .env
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

Running Unit Tests:
```bash
npm run test
```

**Description**: Unit tests are located in the `test/` directory and are responsible for testing individual components like services and controllers.

### Integration Tests

Running Integration Tests:
```bash
npm run test:integration
```

**Description**: Integration tests test the interaction between different parts of the application, such as the service and the database.

### End-to-End Tests

Running End-to-End Tests:
```bash
npm run test:e2e
```

**Description**: End-to-end tests simulate user interactions with the API, testing the application from the user's perspective.

## Deployment

### Docker and Docker Compose

**Build the Docker Image**
```bash
docker build -t yourdockerhubusername/my-nestjs-app:latest .
```

**Run with Docker Compose**
```bash
docker-compose up
```

This will start the application along with PostgreSQL and Datadog containers.

**Docker Compose File**
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - '3000:3000'
    environment:
      - DB_HOST=postgres
      - DB_PORT=5432
      - DB_USERNAME=postgres
      - DB_PASSWORD=yourpassword
      - DB_DATABASE=mydatabase
    depends_on:
      - postgres
      - datadog
  postgres:
    image: postgres:14-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: yourpassword
      POSTGRES_DB: mydatabase
    ports:
      - '5432:5432'
  datadog:
    image: datadog/agent:latest
    environment:
      - DD_API_KEY=your_datadog_api_key
      - DD_APM_ENABLED=true
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
```

### Kubernetes Deployment

**Kubernetes Manifests**
- Deployment: `k8s/deployment.yaml`
- Service: `k8s/service.yaml`

**Apply Kubernetes Manifests**
```bash
kubectl apply -f k8s/
```

This will deploy the application to your Kubernetes cluster.

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

- **ArgoCD Application Manifest**: `argocd/application.yaml`

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

**Setup**
- Datadog Agent is included in the `docker-compose.yml` and Kubernetes manifests.
- Datadog APM is integrated into the application via `dd-trace` package.

**Environment Variables**
```dotenv
DD_API_KEY=your_datadog_api_key
DD_APM_ENABLED=true
```

**Datadog Integration in Application**
```typescript
// main.ts
import 'dd-trace/init'; // Must be imported before anything else

async function bootstrap() {
  // Your bootstrap code
}
bootstrap();
```

## Test Api

curl -X GET http://localhost:3000/users
curl -X GET http://localhost:3000/users/1
curl -X POST http://localhost:3000/users \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Jane Smith",
    "email": "janesmith@example.com"
  }'
curl -X PUT http://localhost:3000/users/1 \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "John Doe Updated",
    "email": "john.doe.updated@example.com"
  }'
curl -X DELETE http://localhost:3000/users/1


## Documentation with Swagger

**Accessing Swagger UI**
After starting the application, navigate to:
```bash
http://localhost:3000/api-docs
```

**Swagger Setup**
```typescript
// main.ts
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('My NestJS App')
    .setDescription('API documentation for My NestJS App')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
```

## Integration with Backstage

### Catalog Info File
- **File**: `catalog-info.yaml`

**Registering with Backstage**
1. Ensure Backstage is set up according to the Backstage documentation.
2. Add the `catalog-info.yaml` file to your repository.
3. In Backstage, register the component by providing the URL to the `catalog-info.yaml`.

**Catalog Info Example**
```yaml
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: my-nestjs-app
  description: A NestJS application following best practices
  tags:
    - nestjs
    - api
spec:
  type: service
  lifecycle: production
  owner: team-a
  providesApis:
    - my-nestjs-app-api
---
apiVersion: backstage.io/v1alpha1
kind: API
metadata:
  name: my-nestjs-app-api
spec:
  type: openapi
  lifecycle: production
  owner: team-a
  definition:
    $text: |
      # OpenAPI definition here (can be auto-generated)
```

## Best Practices

- OOP and SOLID Principles: Applied throughout the codebase for maintainability and scalability.
- Dependency Injection: Leveraged via NestJS's built-in system for better modularity.
- RESTful API Design: Controllers and routes follow REST principles.
- Testing: Comprehensive testing strategy with unit, integration, and end-to-end tests.
- Code Documentation: Detailed comments and Swagger documentation for API endpoints.
- CI/CD: Automated pipelines for building, testing, and deploying the application.
- Infrastructure as Code: Terraform used for consistent environment provisioning.
- Monitoring and Observability: Datadog integrated for performance monitoring.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Open a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Additional Information

**Project Structure**
```lua
my-nestjs-app/
├── src/
│   ├── app.module.ts
│   ├── main.ts
│   ├── user/
│   │   ├── dto/
│   │   │   ├── create-user.dto.ts
│   │   │   └── update-user.dto.ts
│   │   ├── entities/
│   │   │   └── user.entity.ts
│   │   ├── user.controller.ts
│   │   ├── user.module.ts
│   │   └── user.service.ts
│   └── notification/
│       └── notification.service.ts
├── test/
│   ├── app.e2e-spec.ts
│   ├── user.service.int-spec.ts
│   └── user.service.spec.ts
├── .env
├── Dockerfile
├── docker-compose.yml
├── azure-pipelines.yml
├── k8s/
│   ├── deployment.yaml
│   └── service.yaml
├── argocd/
│   └── application.yaml
├── terraform/
│   └── main.tf
├── catalog-info.yaml
├── package.json
├── tsconfig.json
├── jest.config.js
└── README.md
```

## Setting Up Azure DevOps Pipeline

1. Create a New Pipeline in Azure DevOps pointing to your repository.
2. Use Existing Azure Pipelines YAML File: Select the option to use the existing `azure-pipelines.yml` in your repository.
3. Configure Service Connections:
   - Set up a service connection for your Docker registry.
   - Update `dockerRegistryServiceConnection` in the `azure-pipelines.yml` with the name of your service connection.
4. Run the Pipeline: Save and run the pipeline to ensure it works correctly.

## Setting Up ArgoCD

1. Install ArgoCD: Follow the ArgoCD installation guide.
2. Apply the Application Manifest:
   ```bash
   kubectl apply -f argocd/application.yaml
   ```
3. Access ArgoCD UI: Use port forwarding or a LoadBalancer to access the ArgoCD UI.
4. Sync the Application: In the ArgoCD UI, find your application and click "Sync" to deploy it to your cluster.

## Using Terraform for Infrastructure

**Pre-Requisites**
- Azure CLI: Install and authenticate using `az login`.
- Terraform Backend: Configure remote state if needed.

**Steps**
1. **Initialize Terraform**:
   ```bash
   terraform init
   ```
2. **Plan the Deployment**:
   ```bash
   terraform plan -out=tfplan
   ```
3. **Apply the Plan**:
   ```bash
   terraform apply tfplan
   ```
4. **Verify Resources**: Check your Azure portal to verify that the resources are created.

## Environment Variables and Secrets Management

- **Security**: Do not commit sensitive information to version control.
- **Use Azure Key Vault**: For managing secrets like database passwords and API keys.
- **Environment Variables**: Use environment variables to pass configuration to the application.

## Contact

For any questions or support, please contact your.email@example.com.
