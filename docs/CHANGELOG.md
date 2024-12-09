# Changelog

## [0.3.0] - 2024-03-21

### Added
- Integrated Amplify AI conversation and generation routes
- Added chatConversation route with Claude Haiku 3 model support
- Added generateContent route for AI content generation
- Configured AI routes with optimal parameters for chat and generation

### Technical Details
- Implemented a.conversation() and a.generation() routes
- Set default model to Claude Haiku 3 with fallback to environment variable
- Configured AI parameters (temperature: 0.7, maxTokens: 512, topP: 0.9)
- Added public API key authorization for AI routes

## [0.2.0] - 2024-03-20

### Added
- Integrated Amazon Bedrock Nova model for chat functionality
- Created Chat model schema for message storage
- Implemented real-time chat interface
- Added custom query handler for Bedrock integration
- Added chat-specific styling

### Changed
- Converted base Amplify template to chatbot application
- Updated backend configuration to include Bedrock permissions
- Modified frontend UI for chat interactions

### Technical Details
- Added Bedrock IAM permissions for model invocation
- Implemented message persistence using DynamoDB
- Added real-time message subscription
- Configured Nova model with appropriate parameters (temperature: 0.7, topP: 0.9) 