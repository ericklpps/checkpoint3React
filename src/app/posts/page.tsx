//Aqui, os posts já existentes são exibidos, mesmo sem requisição para isso
"use client"
import { useEffect, useState } from "react";
import { getPosts, deletePost } from "../services/ApiPosts";
import { IPost } from "../types/Post";
import AddPost from "@/app/adicionar/AdicionarPost";
import EditPost from "@/app/editar/EditarPost";

const PostsPage = () => {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingPost, setEditingPost] = useState<IPost | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getPosts();
                setPosts(data);
            } catch (error) {
                console.error('Erro ao buscar postagens!', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const handlePostAdded = (newPost: IPost) => {
        setPosts([...posts, newPost]);
    };

    const handleDelete = async (id: number) => {
        try {
            await deletePost(id);
            setPosts(posts.filter(post => post.id !== id));
        } catch (error) {
            console.error('Erro ao excluir postagem!', error);
        }
    };

    const handleEdit = (post: IPost) => {
        setEditingPost(post);
    };

    const handlePostEdited = (updatedPost: IPost) => {
        setPosts(posts.map(post => post.id === updatedPost.id ? updatedPost : post));
        setEditingPost(null);
    };

    const handleCancelEdit = () => {
        setEditingPost(null);
    };

    return (
        <section>
            <br/>
            <h1 className="text-center font-bold text-4xl mb-8">Postagens do blog</h1>
            {loading ? (
                <p>Carregando...</p>
            ) : posts.length === 0 ? (
                <p>Nenhuma postagem encontrada, adicione no formulário abaixo!</p>
            ) : (
                <table className="w-full">
                    <tbody>
                        {posts.map(post => (
                            <tr key={post.id} className="border-b border-gray-200">
                                <td className="py-4">
                                    <img src={post.image} alt={`Imagem do post ${post.id}`} className="w-48 h-auto mx-auto mb-2" />
                                    <h3 className="text-center font-bold text-xl mt-2">{post.title}</h3>
                                    <p className="text-center text-xs mb-2">{post.date}</p>
                                    <div className="flex justify-center">
    <button 
        onClick={() => handleEdit(post)} 
        className="bg-green-500 text-white px-4 py-2 mr-2"
    >
        Editar
    </button>
    <button 
        onClick={() => handleDelete(post.id!)} 
        className="bg-yellow-500 text-white px-4 py-2"
    >
        Excluir
    </button>
</div>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <br/>
            <AddPost onPostAdded={handlePostAdded} />
            {editingPost && (
                <EditPost 
                    post={editingPost} 
                    onPostEdited={handlePostEdited} 
                    onCancel={handleCancelEdit}
                />
            )}
        </section>
    );
};

export default PostsPage;
