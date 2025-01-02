# BeerOCR

## Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## About the project

The project includes the following services:

1. **ocr_api**: A Python gRPC server that receives an image and returns the brand name of the beer. It can identify one of the following brands: Brahma, Spaten, and Corona.

2. **gateway_api**: A NestJS REST API that provides the `/upload` route. This route receives an image file, calls the `ocr_api` to get the brand name, and saves the consultation data to a PostgreSQL database.

## Setup

2. **Set up environment variables:**

   Copy the `.env.example` file to `.env` and configure the variables as needed:

   ```bash
   cp .env.example .env
   ```

### Running the Project

1. **Build the containers and start the services:**

   ```bash
   docker compose up --build
   ```

---

## Request Examples

To use the project, you can make a request like this:

```bash
curl --location 'http://localhost:{GATEWAY_PORT}/upload' \
--form 'file=@"/path/to/file"'
```

Alternatively, open `http://localhost:{GATEWAY_PORT}` in your browser to use the HTML interface.

## Running Unit Tests for Gateway API

```bash
   cd gateway_api && yarn test
```
