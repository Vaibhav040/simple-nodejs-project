# 🛡️ Node.js Secret Service (Docker Edition)

A simple Node.js API that provides a public greeting and a protected secret route using Basic Authentication. This project is fully containerized for consistent deployment.

## 📋 Prerequisites
* **Docker Desktop** installed and running on your machine.
* A `.env` file in your root directory containing:
  ```text
  PORT=3000
  USERNAME=your_username
  PASSWORD=your_password
  SECRET_MESSAGE=your_secret_message
  ```

---

## 🐳 Running with Docker

### 1. Build the Docker Image
This command packages your application code into a reusable image. Because of the `.dockerignore` file, your sensitive `.env` file is **not** included in this image.

```bash
docker build -t simple-node .
```

* **`-t simple-node`**: Assigns the name "secret-service" to your image.
* **`.`**: Instructs Docker to use the current directory to find the Dockerfile.

### 2. Run the Container
Since the image does not contain your secrets, you must "inject" them at runtime using the `--env-file` flag.

```bash
docker run -p 3000:3000 --env-file .env simple-node
```

* **`-p 3000:3000`**: Maps port 3000 of the container to port 3000 on your host machine.
* **`--env-file .env`**: Loads your local environment variables into the running container.
* **`simple-node`**: The name of the image you built in Step 1.

---

## 🧪 Verification

1.  **Check Running Containers:**
    ```bash
    docker ps
    ```
    You should see `simple-node` listed as "Up".

2.  **Access the Service:**
    * **Public:** [http://localhost:3000/](http://localhost:3000/)
    * **Secret:** [http://localhost:3000/secret](http://localhost:3000/secret) (Enter the credentials from your `.env` file).

---

## ⚠️ Important Notes
* **Updating Secrets:** If you change your password in the `.env` file, you **do not** need to rebuild the image. Simply stop the container (`Ctrl + C`) and run the `docker run` command again.
* **Security:** Never commit your `.env` file to version control. It is excluded from the Docker image to ensure secrets are handled separately from code.
