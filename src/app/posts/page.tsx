// src/app/posts/PostsPage.tsx
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
            <h1>Postagens do blog</h1>
            {loading ? (
                <p>Carregando...</p>
            ) : posts.length === 0 ? (
                <p>Nenhuma postagem encontrada.</p>
            ) : (
                <ul className="list-disc pl-5 space-y-2">
                    {posts.map((post) => (
                        <li key={post.id}>
                            <h3>{post.title}</h3>
                            <p>{post.date}</p>
                            <img src={post.image} alt={`Imagem do post ${post.id}`} />
                            <button 
                                onClick={() => handleDelete(post.id!)} 
                                className="bg-red-500 text-white ml-2 px-2 py-1"
                            >
                                Excluir
                            </button>
                            <button 
                                onClick={() => handleEdit(post)} 
                                className="bg-yellow-500 text-white ml-2 px-2 py-1"
                            >
                                Editar
                            </button>
                        </li>
                    ))}
                </ul>
            )}
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
