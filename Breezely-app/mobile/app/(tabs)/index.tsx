import { FlatList, View, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import ExpandableTaskCard from "../components/expandable_card";

interface Task {
    _id: string;
    title: string;
    note: string;
    category: string;
    date: string;
    remindDate: string;
    remindTime: string;
    pdfs: {
        url: string;
        publicId: string;
    }[]; 
}

export default function Home() {

    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTasks = async () => {
        try {
            const response = await fetch("http://192.168.1.9:5000/api/tasks", {
                method: "GET"
            });

            const data = await response.json();
            
            // Based on your logs, the array is inside data.tasks
            if (data && data.tasks) {
                setTasks(data.tasks); 
            }
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {loading ? (
                <ActivityIndicator size="large" color="#000" style={{ marginTop: 50 }} />
            ) : (
                <FlatList
                    data={tasks}
                    keyExtractor={(item, index) => item._id || index.toString()}
                    renderItem={({ item }) => (
                        <ExpandableTaskCard 
                            title={item.title} 
                            note={item.note} 
                            date={item.date} 
                        />
                    )}
                    // This adds padding to the top of the list
                    contentContainerStyle={{ paddingTop: 20, paddingBottom: 20 }}
                />
            )}
        </View>
    );
}