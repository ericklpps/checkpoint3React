//Consumindo a api e separando em exports para realizar o crud
import axios from "axios";
import { IPost } from "@/app/types/Post";

// Configuração do axios para consumir a API
const api = axios.create({
    baseURL: 'http://localhost:4001/',
});

// Função para obter posts
export const getPosts = async (): Promise<IPost[]> => {
    const response = await api.get('/posts');
    const postsData = response.data.posts.map((post: any) => ({
        id: post.id,
        title: post.title,
        date: post.date,
        image: post.image
    })) as IPost[]; // Convertendo os dados recuperados para o tipo IPost
    return postsData;
};

// Função para adicionar um novo post
export const addPost = async (post: IPost) => {
    const response = await api.post('/posts', post);
    return response.data;
};

// Função para excluir um post
export const deletePost = async (id: number) => {
    await api.delete(`/posts/${id}`);
};

// Função para editar um post
export const editPost = async (id: number, updatedPost: IPost) => {
    const response = await api.put(`/posts/${id}`, updatedPost);
    return response.data;
};
