# Floating Chatbot Setup Guide

## Overview
This project now includes a floating chatbot in the bottom right corner powered by the Falcon 1B model via Hugging Face's inference API.

## Features
- 🚀 **Floating Design**: Positioned in the bottom right corner of every page
- 🤖 **AI-Powered**: Uses Falcon 1B model for intelligent responses
- 💬 **Conversation History**: Maintains context across messages
- 📱 **Responsive**: Works on both desktop and mobile devices
- 🎨 **Modern UI**: Beautiful gradient design with smooth animations
- ⚡ **Quick Actions**: Suggested questions for easy interaction

## Setup Instructions

### 1. Get Hugging Face API Key
1. Go to [Hugging Face](https://huggingface.co/)
2. Create an account or sign in
3. Go to [Settings > Access Tokens](https://huggingface.co/settings/tokens)
4. Create a new token with read permissions
5. Copy the token

### 2. Environment Configuration
Create a `.env.local` file in your project root with:

```env
# Hugging Face API Key for Falcon 1B model
HUGGINGFACE_API_KEY=your_actual_api_key_here

# Other existing environment variables
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Model Configuration
The chatbot is configured to use the `tiiuae/falcon-7b-instruct` model by default. You can change this in `app/api/chatbot/route.ts`:

```typescript
const FALCON_MODEL = "tiiuae/falcon-7b-instruct";
```

### 4. Start the Development Server
```bash
npm run dev
```

## How It Works

### Frontend Component
- **Location**: `components/FloatingChatbot.tsx`
- **Position**: Fixed positioning in bottom right corner
- **States**: Closed, Open, Minimized
- **Features**: Message history, typing indicators, quick actions

### Backend API
- **Location**: `app/api/chatbot/route.ts`
- **Model**: Falcon 1B via Hugging Face inference API
- **Features**: Conversation context, error handling, fallback responses

### Integration
- **Layout**: Automatically included in `app/layout.tsx`
- **Global**: Available on all pages
- **Styling**: Uses existing UI components and Tailwind CSS

## Customization

### Changing the Model
To use a different model, update the `FALCON_MODEL` constant in the API route:

```typescript
// Examples of other models you can try:
const FALCON_MODEL = "tiiuae/falcon-7b-instruct";  // Current
const FALCON_MODEL = "tiiuae/falcon-7b";           // Base model
const FALCON_MODEL = "microsoft/DialoGPT-medium";   // Alternative
```

### Modifying the UI
The chatbot uses the existing UI components from `components/ui/`. You can:
- Change colors by modifying the gradient classes
- Adjust positioning by changing the `fixed bottom-6 right-6` classes
- Modify the size by changing the `w-80 h-96` dimensions

### Adding Quick Actions
Update the quick action buttons in the component:

```typescript
{[
  "Tell me about AI",
  "Travel tips", 
  "General knowledge",
  "How can you help me?"
].map((suggestion) => (
  // ... button rendering
))}
```

## Troubleshooting

### Common Issues

1. **"Hugging Face API key not configured"**
   - Ensure `.env.local` file exists
   - Check that `HUGGINGFACE_API_KEY` is set correctly
   - Restart the development server

2. **"Failed to get response"**
   - Verify your API key has the correct permissions
   - Check the browser console for detailed error messages
   - Ensure the model is available and not rate-limited

3. **Slow responses**
   - The Falcon model may take a few seconds to respond
   - Consider using a smaller/faster model for production

### API Limits
- Hugging Face has rate limits on free accounts
- Consider upgrading for production use
- Monitor usage in your Hugging Face dashboard

## Production Considerations

1. **Environment Variables**: Use proper environment variable management
2. **Error Handling**: Implement comprehensive error handling
3. **Rate Limiting**: Add rate limiting to prevent abuse
4. **Monitoring**: Add logging and monitoring for API calls
5. **Caching**: Consider caching responses for common questions

## Support
For issues or questions:
1. Check the browser console for error messages
2. Verify your API key and permissions
3. Test the Hugging Face API directly
4. Check the project's GitHub issues

---

The chatbot is now ready to use! It will appear as a floating blue-purple button in the bottom right corner of every page.
