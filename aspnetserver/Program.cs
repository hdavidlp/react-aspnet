using aspnetserver.Data;
using aspnetserver.Repositories.Post;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Models;
//using Microsoft.AspNetCore.Http;
//using Swashbuckle.AspNetCore.SwaggerUI;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("CORSPolicy",
        builder =>
        {
            builder
            .AllowAnyMethod()
            .AllowAnyHeader()
            .WithOrigins("http://localhost:3000", "https://appname.azurestaticapps.net");
        });
});

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(swaggerGenOptions => 
{
    swaggerGenOptions.SwaggerDoc("v1", new OpenApiInfo { Title = "ASP.Net React Tutorial", Version = "v1" });

});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(swaggerUIOptions =>
{
    swaggerUIOptions.DocumentTitle = "ASP.Net React Tutorial";
    swaggerUIOptions.SwaggerEndpoint("/swagger/v1/swagger.json", "Web API serving a very simple PostModel");
    swaggerUIOptions.RoutePrefix = String.Empty;
});

app.UseHttpsRedirection();
app.UseCors("CORSPolicy");

app.MapGet ("/get-all-posts", async () => await PostRepository.GetPostsAsync())
    .WithTags("Post Endpoints");

app.MapGet("/get-post-by-id/{postId}", async (int postId) =>
    {
        Post postToReturn = await PostRepository.GetPostByIdAsync(postId);
    
        if (postToReturn!= null)
        {
            return Results.Ok(postToReturn);
        }
        else
        {
            return Results.BadRequest();
        }
    }).WithTags("Post Endpoints");


app.MapPost("/create-post", async (Post postToCreate) =>
{
    bool createSuccessful = await PostRepository.CreatePostAsync(postToCreate);

    if (createSuccessful)
    {
        return Results.Ok("Create successful");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Post Endpoints");

app.MapPut ("/update-post", async (Post postToUpdate) =>
{
    bool updateSuccessful = await PostRepository.UpdatePostAsync(postToUpdate);

    if (updateSuccessful)
    {
        return Results.Ok("Update successful");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Post Endpoints");


app.MapDelete("/delete-post-by-id/{postId}", async (int postId) =>
{
    bool deleteSuccessful = await PostRepository.DelePostAsync(postId);

    if (deleteSuccessful)
    {
        return Results.Ok("Delete successful");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Post Endpoints");



app.Run();