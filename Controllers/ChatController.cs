using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using TestSignalR.Hubs;

namespace TestSignalR.Controllers;

[ApiController]
[Route("[controller]")]
public class ChatController : ControllerBase
{
    private readonly IHubContext<ChatHub, IChatClient> _chatHub;
    
    public ChatController(IHubContext<ChatHub, IChatClient> chatHub)
    {
        _chatHub = chatHub;
    }

    [HttpPost("messages")]
    public async Task Post(ChatMessage message)
    {
        // run some logic...
        Console.WriteLine($"{message.User} says {message.Message}");
        await _chatHub.Clients.All.ReceiveMessage(message);
    }
}