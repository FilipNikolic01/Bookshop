using BookshopServer.Entities;
using BookshopServer.Specifications;

namespace BookshopServer.Interfaces
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        Task<IReadOnlyList<T>> GetAllAsync();
        Task<IReadOnlyList<T>> GetAsync(ISpecification<T> specification);
        Task<T> GetByIdAsync(int id);
        Task<T> GetEntityWithSpecAsync(ISpecification<T> specification);
        Task<int> CountAsync(ISpecification<T> specification);
        Task AddAsync(T entity);
        Task UpdateAsync(T entity);
        Task DeleteAsync(T entity);
    }
}
