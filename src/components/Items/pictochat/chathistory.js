function ChatHistory({ imageUrl }) {
    return (
        <div>
            {imageUrl && <img src={imageUrl} alt="Chat Drawing" />}
        </div>
    );
}

export default ChatHistory;
