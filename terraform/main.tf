terraform {
  required_version = ">= 0.12"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=3.0.2" # Adjust the version as needed
    }
  }
}

provider "azurerm" {
  features {}
}

# Resource Group
resource "azurerm_resource_group" "rg" {
  name     = "rg-my-nestjs-app"
  location = "East US"
}

# AKS Cluster
resource "azurerm_kubernetes_cluster" "aks" {
  name                = "aks-my-nestjs-app"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  dns_prefix          = "aksmynestjsapp"

  default_node_pool {
    name       = "default"
    node_count = 3
    vm_size    = "Standard_DS2_v2"
  }

  identity {
    type = "SystemAssigned"
  }
}

# PostgreSQL Server
resource "azurerm_postgresql_server" "postgres" {
  name                = "postgres-my-nestjs-app"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  administrator_login = "postgresadmin"
  administrator_login_password = "YourSecurePassword123!"
  version             = "11"
  sku_name            = "GP_Gen5_2"
  storage_mb          = 5120
  auto_grow_enabled   = true
  backup_retention_days      = 7
  geo_redundant_backup_enabled = false
  ssl_enforcement_enabled     = true  # Added required attribute
}

# PostgreSQL Database
resource "azurerm_postgresql_database" "db" {
  name                = "mydatabase"
  resource_group_name = azurerm_resource_group.rg.name
  server_name         = azurerm_postgresql_server.postgres.name
  charset             = "UTF8"
  collation           = "English_United States.1252"
}
