# Vertex AI Chat App

A modern chat application built with Next.js and Google Vertex AI, featuring a clean interface and real-time conversations.

## Features

- 🤖 **Vertex AI Integration**: Powered by Google's advanced AI models
- 🌓 **Dark/Light Mode**: Toggle between themes with system preference detection
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices
- 💬 **Real-time Chat**: Smooth conversation flow with typing indicators
- 🧹 **Clear Chat**: Reset conversation history anytime
- ⚡ **Fast & Modern**: Built with Next.js 15 and React 19

## Prerequisites

Before you begin, ensure you have:

1. **Node.js 18+** installed on your system
2. **Google Cloud Project** with Vertex AI API enabled
3. **Service Account** with appropriate permissions
4. **Service Account Key** downloaded as JSON file

## Google Cloud Setup

### 1. Create a Google Cloud Project
```bash
# Install Google Cloud CLI if you haven't already
# Visit: https://cloud.google.com/sdk/docs/install

# Create a new project (or use existing one)
gcloud projects create your-project-id
gcloud config set project your-project-id
```

### 2. Enable Vertex AI API
```bash
gcloud services enable aiplatform.googleapis.com
```

### 3. Create Service Account
```bash
# Create service account
gcloud iam service-accounts create vertex-ai-chat \
    --description="Service account for Vertex AI Chat App" \
    --display-name="Vertex AI Chat"

# Grant necessary permissions
gcloud projects add-iam-policy-binding your-project-id \
    --member="serviceAccount:vertex-ai-chat@your-project-id.iam.gserviceaccount.com" \
    --role="roles/aiplatform.user"

# Create and download key
gcloud iam service-accounts keys create ~/vertex-ai-key.json \
    --iam-account=vertex-ai-chat@your-project-id.iam.gserviceaccount.com
```

## Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Configure environment variables**:

Edit `.env.local` with your configuration:
```env
# Google Cloud Service Account Credentials Path
GS_CREDENTIALS_PATH=/absolute/path/to/your/service-account-key.json

# Google Cloud Project Configuration
GOOGLE_CLOUD_PROJECT_ID=your-project-id
GOOGLE_CLOUD_REGION=us-central1

# Vertex AI Model Configuration
VERTEX_AI_MODEL=gemini-1.5-flash-001
```

3. **Run the development server**:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to start chatting!

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
