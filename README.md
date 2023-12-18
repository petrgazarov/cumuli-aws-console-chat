# cumuli-aws-chrome-extension

Cumuli extension helps you build, debug, and analyze your cloud infrastructure using AI without leaving the AWS console. Ask any questions about your current screen.

### Installation

Install on the [Chrome web store](https://chromewebstore.google.com/detail/cumuli-aws-console-chat/ekdfdahmkpbenhccafhdkmjfgcioejbc)

### Use cases

- AWS learners: Get unblocked by asking AI how to fix errors or use unfamiliar features.
- AWS professionals: Quickly resolve questions while prototyping, monitoring, or debugging.
- Everyone: Pair with AI without context-switching for increased productivity.

### Features

- AI Contextual Understanding: Pass screenshots as context to the language model.
- Privacy-first: Data is processed and stored locally and is sent directly to OpenAI API. This extension doesn't have a server. OpenAI's privacy policy applies.
- Strong Security: OpenAI API key and conversation history are stored locally in the extension-specific browser storage, following best practices.
- Conversation History: View previous messages and resend with edits.
- Adaptive UI: Dark and light mode theme selection is automatic based on your system settings.
- Convenient layout: Toggle Chrome's Side panel with a keyboard shortcut (Ctrl/Cmd + B suggested).

### Requirements

- An OpenAI account and an API key are required to use this extension (get your API key here: https://platform.openai.com/api-keys).
- Your OpenAI account must have access to the GPT-4 model. There is no waitlist, but they do require a small purchase of credits in order to enable GPT-4, as of this writing.

### Usage

1. Click on the extension icon or use a keyboard shortcut ("Cmd/Ctrl + B" suggested) to activate the extension. Activating the extension opens the Side panel. The extension can only be activated on AWS pages. The following domain namespaces are included:

   - aws.amazon.com
   - amazonaws-us-gov.com
   - amazonaws.cn
   - aws.training
   - .aws

2. Add your OpenAI API key in the "Config" tab.
3. The suggested keyboard shortcut for taking a screenshot is "Cmd/Ctrl + U".

To troubleshoot or change any shortcut, visit the extension shortcuts settings in your browser: chrome://extensions/shortcuts and select the Cumuli extension.
