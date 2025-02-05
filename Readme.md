<div align="center">
  <a href="">
    <img src="./images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Beer OCR 🍻</h3>

  <p align="center">
    An OCR to verify the beer brand
    <br />
   <a href="#setup"><strong>Getting started  »</strong></a>
    <br />
    <br />
      &middot;
      <a href="https://github.com/BrunoVollin/devour-map/BeerOCR">Report Bug</a>
      &middot;
      <a href="https://github.com/BrunoVollin/devour-map/BeerOCR">Request Feature</a>
  </p>
</div>


## Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## About the project
This project automates the process of verifying beer brands in industrial settings. By using OCR to quickly and accurately identify the brand from images, it reduces human error and manual labor, improving efficiency and accuracy. The integration with a PostgreSQL database also ensures that all consultation data is stored for future reference, allowing for better tracking and reporting. This solution streamlines operations, enhances data management, and supports quality control in industries that deal with multiple beer brands.
## Diagram
<div align="center">
    <img src="https://github.com/user-attachments/assets/c5ca9ad2-c6f4-46b4-99be-e7606370a40f" alt="Diagram">
</div>

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

## License

This project is licensed under the MIT License - see the [LICENSE.txt](LICENSE.txt) file for details.