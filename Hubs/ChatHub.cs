using Microsoft.AspNetCore.SignalR;

namespace TestSignalR.Hubs;

public class ChatHub: Hub<IChatClient>
{ }

public class ChatMessage
{
    public string User { get; set; }

    public string Message { get; set; }
}

public interface IChatClient
{
    Task ReceiveMessage(ChatMessage message);
}