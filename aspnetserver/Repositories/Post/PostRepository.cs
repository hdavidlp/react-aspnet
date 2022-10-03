using aspnetserver.Data;
using Microsoft.EntityFrameworkCore;

namespace aspnetserver.Repositories.Post
{
    internal static class PostRepository
    {
        internal async static Task<List<Data.Post>> GetPostsAsync()
        {
            using (var db = new AppDBContext())
            {
                return await db.Posts.ToListAsync();
            }
        }

        internal async static Task<Data.Post> GetPostByIdAsync(int postId)
        {
            using (var db = new AppDBContext())
            {
                return await db.Posts
                    .FirstOrDefaultAsync(post => post.PostId == postId);
            }
        }

        internal async static Task<bool> CreatePostAsync(Data.Post postToCreate)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    await db.Posts.AddAsync(postToCreate);
                    return await db.SaveChangesAsync()>=1;
                }
                catch(Exception e)
                {
                    return false;
                }
            }
        }
        internal async static Task<bool> UpdatePostAsync(Data.Post postToUpdate)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    db.Posts.Update(postToUpdate);
                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }
            }
        }

        internal async static Task<bool> DelePostAsync(int PostId)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    Data.Post postToDelete = await GetPostByIdAsync(PostId);
                    db.Posts.Remove(postToDelete);
                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }
            }
        }

    }
}
