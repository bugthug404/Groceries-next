# Groceries

## Getting Started

Follow these steps to run this project on your local machine:

1.  **Clone the repository**

If you haven't already, clone the repository to your local machine:

```bash
git clone https://github.com/bugthug404/Groceries-next.git
```

2.  **Navigate to the project directory**

Change your current directory to the project directory:

```bash
cd Groceries-next
```

3.  **Install dependencies**
    You need to install the dependencies for both the frontend and backend.

_Note: Open 2 terminal 1 for backend & 1 for frontend to keep both process seperate._

For the frontend (frontend terminal):

```bash
cd frontend
npm install
```

For the backend (backend terminal):

```bash
cd backend
npm install
```

4.  **Set up environment variables**
    Copy the sample environment variable files and fill in the necessary values:

For the frontend (frontend terminal):

```bash
cp .env.sample .env.local
```

For the backend (backend terminal):

```bash
cp .env.sample .env
```

5.  **Start the servers**
    You can now start the frontend and backend servers.

For the frontend (frontend terminal):

```bash
npm run dev
```

For the backend (backend terminal):

```bash
npm run dev
```

Now, you should be able to access the application at `http://localhost:3000` (or whatever port your frontend server is running on).

Test online demo [here](https://groceries-next.vercel.app/).

_Note: backend is deployed in render.com & may take some time in first api call.
run test api call to check if backend is working or not_
