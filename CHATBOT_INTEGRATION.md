# Travel Chatbot Integration Guide

## Overview
The Travel Chatbot is a comprehensive AI-powered travel assistant that can be used across all webpages in your GlobeTrotter application. It currently uses a sophisticated travel knowledge base with the capability to integrate with the Falcon 1B model.

## Features
- **Floating Chat Interface**: Available on every webpage
- **Text Input**: Users can type travel-related queries
- **Smart Responses**: AI-powered travel advice and recommendations
- **Responsive Design**: Works on all devices
- **Minimize/Maximize**: Users can minimize the chat when not needed
- **Real-time Interaction**: Instant responses with loading indicators

## Current Implementation
The chatbot currently uses a comprehensive travel knowledge base that covers:
- Destination recommendations (Europe, Asia, Americas)
- Travel tips and advice
- Planning guidance
- Budget information
- Safety and weather information
- Food and cuisine recommendations

## Falcon 1B Model Integration

### Option 1: Hugging Face Inference API
```typescript
// In app/api/chatbot/route.ts, replace the callFalconModel function:

async function callFalconModel(message: string): Promise<string | null> {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct",
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: `You are a travel expert. Answer this travel question in a helpful and informative way: ${message}`,
          parameters: {
            max_new_tokens: 150,
            temperature: 0.7,
            top_p: 0.9,
            do_sample: true,
          },
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data[0].generated_text;
    }
    
    return null;
  } catch (error) {
    console.error('Falcon model error:', error);
    return null;
  }
}
```

### Option 2: Local Falcon Model (Advanced)
For running the model locally, you can use:
- **Ollama**: `ollama run falcon:7b`
- **LM Studio**: Load the Falcon model locally
- **Custom API**: Deploy the model on your own infrastructure

### Option 3: Alternative AI Models
If Falcon 1B is not available, consider:
- **Llama 2**: Meta's open-source model
- **Mistral**: High-performance open model
- **Gemini**: Google's AI model
- **Claude**: Anthropic's AI assistant

## Environment Variables
Add these to your `.env.local` file:
```bash
# For Hugging Face
HUGGINGFACE_API_KEY=your_api_key_here

# For other providers
FALCON_API_KEY=your_api_key_here
OPENAI_API_KEY=your_api_key_here
```

## API Endpoints

### POST /api/chatbot
Send a message and get a response:
```json
{
  "message": "What are the best places to visit in Europe?"
}
```

Response:
```json
{
  "response": "Here are some amazing European destinations...",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "model": "Falcon 1B Model",
  "messageLength": 45
}
```

### GET /api/chatbot
Get API status and information.

## Customization

### Adding New Travel Topics
Extend the `TRAVEL_KNOWLEDGE` object in `app/api/chatbot/route.ts`:
```typescript
const TRAVEL_KNOWLEDGE = {
  // ... existing categories
  adventure: [
    "Hiking in the Swiss Alps",
    "Scuba diving in the Great Barrier Reef",
    "Rock climbing in Yosemite"
  ],
  luxury: [
    "Five-star hotels in Dubai",
    "Private yacht charters in the Mediterranean",
    "Exclusive safari experiences in Africa"
  ]
};
```

### Styling Customization
Modify the `TravelChatbot.tsx` component to change:
- Colors and themes
- Chat bubble styles
- Animation effects
- Layout positioning

### Response Logic
Enhance the `generateTravelResponse` function to handle:
- More complex queries
- Context-aware responses
- Multi-language support
- Personalized recommendations

## Performance Optimization

### Caching
Implement response caching for common queries:
```typescript
import { LRUCache } from 'lru-cache';

const responseCache = new LRUCache({
  max: 100,
  ttl: 1000 * 60 * 60, // 1 hour
});

// Check cache before calling model
const cachedResponse = responseCache.get(message);
if (cachedResponse) return cachedResponse;
```

### Rate Limiting
Add rate limiting to prevent abuse:
```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
```

## Testing

### Manual Testing
1. Open any webpage in your app
2. Click the chat button (bottom right)
3. Type travel-related questions
4. Verify responses are relevant and helpful

### Automated Testing
```typescript
// tests/chatbot.test.ts
describe('Travel Chatbot', () => {
  test('should respond to destination questions', async () => {
    const response = await fetch('/api/chatbot', {
      method: 'POST',
      body: JSON.stringify({ message: 'Tell me about Paris' })
    });
    
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.response).toContain('Paris');
  });
});
```

## Troubleshooting

### Common Issues
1. **Chat not appearing**: Check if component is imported in layout.tsx
2. **API errors**: Verify environment variables are set
3. **Slow responses**: Check model API status and rate limits
4. **Styling issues**: Ensure Tailwind CSS is properly configured

### Debug Mode
Enable debug logging:
```typescript
const DEBUG = process.env.NODE_ENV === 'development';

if (DEBUG) {
  console.log('Chatbot request:', message);
  console.log('Model response:', falconResponse);
}
```

## Future Enhancements
- **Voice Input**: Speech-to-text capabilities
- **Image Recognition**: Analyze travel photos
- **Multi-language Support**: Respond in user's preferred language
- **Personalization**: Remember user preferences and travel history
- **Integration**: Connect with booking systems and travel APIs
- **Offline Mode**: Cache responses for offline use

## Support
For issues or questions about the chatbot integration:
1. Check the console for error messages
2. Verify API keys and endpoints
3. Test with simple queries first
4. Review the network tab for API calls
