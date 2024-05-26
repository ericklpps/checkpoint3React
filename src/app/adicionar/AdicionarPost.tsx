//função de adicionar post, está separada, pois se trata de um formulário
import React, { useState } from "react";
import { addPost } from "@/app/services/ApiPosts";
import { IPost } from "@/app/types/Post";

interface AddPostProps {
    onPostAdded: (newPost: IPost) => void;
}

const AddPost: React.FC<AddPostProps> = ({ onPostAdded }) => {
    const [formData, setFormData] = useState<IPost>({ title: '', date: '', image: '' });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const newPost = await addPost(formData);
            alert('Post adicionado com sucesso');
            setFormData({ title: '', date: '', image: '' });
            onPostAdded(newPost);
        } catch (error) {
            console.error('Erro ao adicionar post', error);
            alert('Erro ao adicionar post');
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-2xl font-bold mb-4">Adicionar Post</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-md">
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Título:</label>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="border border-gray-600 px-4 py-2 rounded-md w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="date" className="block text-gray-700 font-bold mb-2">Data:</label>
                    <input
                        id="date"
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="border border-gray-600 px-4 py-2 rounded-md w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-gray-700 font-bold mb-2">URL da Imagem:</label>
                    <input
                        id="image"
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="border border-gray-600 px-4 py-2 rounded-md w-full"
                        required
                    />
                </div>
                <button className="bg-red-500 text-white px-4 py-2 rounded-md" type="submit">Adicionar Post</button>
            </form>
        </div>
    );
};

export default AddPost;
