# 💬 Socket.IO Real-Time Chat Application

A real-time chat application built with Node.js, Express, and Socket.IO that supports both public broadcasting and private messaging between specific users.

## ✨ Features

- 🌐 **Real-time Communication** - Instant message delivery using WebSockets
- 📢 **Public Messages** - Broadcast messages to all connected users
- 🔒 **Private Messages** - Send messages to specific users
- 👥 **Online Users List** - See all connected users in real-time
- ⌨️ **Typing Indicators** - See when someone is typing
- 🎨 **Clean UI** - Modern and responsive design
- 🎯 **User Selection** - Click on users to send them private messages
- 🔔 **Visual Feedback** - Different colors for public/private messages

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. Clone or download this repository

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to:

```
http://localhost:3000
```

## 📖 Usage

### Sending Public Messages

1. Type your message in the input box at the bottom
2. Press **Enter** or click **Send**
3. Everyone connected will see your message

### Sending Private Messages

1. Look at the **Online Users** panel on the right
2. Click on a user you want to message
3. Type your message (notice the placeholder changes)
4. Press **Enter** or click **Send**
5. Only that specific user will receive the message

### Switching Back to Public Mode

- Click the **"Send to All"** button in the users panel
- Or simply click on another user to send them a private message

## 🎨 Message Types

The chat displays three types of messages with different visual styles:

- **Gray Background** - Public messages (everyone sees these)
- **Blue Background** - Private messages you received
- **Green Background** - Private messages you sent

## 🛠️ Technical Details

### Technology Stack

- **Backend:**

  - Node.js
  - Express.js
  - Socket.IO v4.8.1

- **Frontend:**
  - Vanilla JavaScript
  - Socket.IO Client
  - HTML5 & CSS3

### Project Structure

```
NODEJS-SOCKETS/
├── index.js          # Server-side code with Socket.IO logic
├── index.html        # Client-side UI and Socket.IO client logic
├── package.json      # Project dependencies and scripts
└── README.md         # This file
```

### Key Socket.IO Methods Used

#### Server Side (index.js)

```javascript
// Send to specific user only
io.to(socketId).emit("event_name", data);

// Send to everyone
io.emit("event_name", data);

// Send to everyone except sender
socket.broadcast.emit("event_name", data);

// Send only to sender
socket.emit("event_name", data);
```

#### Client Side (index.html)

```javascript
// Listen for events from server
socket.on("event_name", (data) => {
  // Handle received data
});

// Send event to server
socket.emit("event_name", data);
```

## 📡 Socket.IO Events

### Server Events (Emitted by Server)

| Event                     | Description                          | Data                |
| ------------------------- | ------------------------------------ | ------------------- |
| `your_id`                 | Sends user their socket ID           | `socket.id`         |
| `users_list`              | List of all connected users          | `Array of users`    |
| `send_message_to_all`     | Public message broadcast             | `message string`    |
| `receive_private_message` | Private message received             | `{ from, message }` |
| `private_message_sent`    | Confirmation of sent private message | `{ to, message }`   |
| `show_typing_status`      | Someone is typing                    | none                |
| `hide_typing_status`      | Typing stopped                       | none                |

### Client Events (Emitted by Client)

| Event             | Description          | Data                       |
| ----------------- | -------------------- | -------------------------- |
| `chat message`    | Send public message  | `message string`           |
| `private_message` | Send private message | `{ recipientId, message }` |
| `typing`          | User started typing  | none                       |
| `stop_typing`     | User stopped typing  | none                       |

## 🔧 Configuration

### Port Configuration

The server runs on port 3000 by default. You can change this by setting the `PORT` environment variable:

```bash
# Windows PowerShell
$env:PORT=4000; npm run dev

# Windows CMD
set PORT=4000 && npm run dev

# Linux/Mac
PORT=4000 npm run dev
```

## 🧪 Testing

To test the application:

1. Open multiple browser tabs/windows to `http://localhost:3000`
2. Each tab represents a different user with a unique socket ID
3. Try sending public messages (everyone sees them)
4. Select a user in one tab and send a private message
5. Observe that only the selected user receives the private message

## 📝 How It Works

### Private Messaging Flow

1. **Connection:**

   - User connects to server
   - Server assigns unique `socket.id`
   - Server sends ID back to user
   - Server broadcasts updated users list

2. **Sending Private Message:**

   - User selects recipient from users list
   - User types message and clicks send
   - Client emits `private_message` with `{ recipientId, message }`
   - Server receives and uses `io.to(recipientId).emit()` to send to specific user
   - Server sends confirmation back to sender

3. **Receiving Private Message:**
   - Recipient gets `receive_private_message` event
   - Message displays with blue background
   - Shows "Private from [sender ID]"

## 🤝 Contributing

Feel free to fork this project and add your own features! Some ideas:

- Add usernames instead of socket IDs
- Add message timestamps
- Add file/image sharing
- Add message history/persistence
- Add user authentication
- Add chat rooms
- Add emoji support
- Add sound notifications

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Created as a learning project for Socket.IO and real-time communication.

## 🆘 Troubleshooting

### Port Already in Use

If you get an error that port 3000 is already in use:

```bash
# Find and kill the process using port 3000
# Windows PowerShell:
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
```

### Connection Issues

- Make sure your firewall allows connections on port 3000
- Try accessing via `127.0.0.1:3000` instead of `localhost:3000`
- Check if Node.js is properly installed: `node --version`

### Messages Not Sending

- Check browser console for errors (F12)
- Make sure Socket.IO client is loaded (check Network tab)
- Verify the server is running without errors

## 📚 Learn More

- [Socket.IO Documentation](https://socket.io/docs/v4/)
- [Express.js Documentation](https://expressjs.com/)
- [Node.js Documentation](https://nodejs.org/docs/)

---

**Happy Chatting! 🎉**
