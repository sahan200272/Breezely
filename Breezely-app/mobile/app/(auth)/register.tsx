import { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import axios from "axios";

export default function Login(){

    const [name, SetName] = useState("");
    const [emial, setEmial] = useState("");
    const [familiarHand, setFamiliarHand] = useState("");
    const [password, setPassword] = useState("");
    const [comPassword, setComPassword] = useState("");

    const passwordMatching = () => {

        if(password != comPassword){
            return alert("Password should be same");
        }
    }

    const handleSubmit = async() => {

        passwordMatching();

        const user = {

            "name": name,
            "email": emial,
            "familiarHand": familiarHand,
            "password": password
        }

        const response = await axios.post("http://localhost:5000/api/users/register", user);

        alert(response.status);
    }


    return(
        <View style={styles.container}>

            <Text>Register</Text>

            <Text>Name</Text>
            <TextInput
                placeholder="Enter Your Name"
                onChangeText={SetName}
            ></TextInput>

            <Text>Emial</Text>
            <TextInput
                placeholder="Enter Your Emial"
                onChangeText={setEmial}
            ></TextInput>

            <Text>Familiar Hand</Text>
            <TextInput
                placeholder="Enter Your Familiar Hand"
                onChangeText={setFamiliarHand}
            ></TextInput>

            <Text>Password</Text>
            <TextInput
                placeholder="Enter Your Password"
                onChangeText={setPassword}
            ></TextInput>

            <Text>Re-enter Password</Text>
            <TextInput
                placeholder="Re-enter Password"
                onChangeText={setComPassword}
            ></TextInput>

            <button title="Submit" onClick={handleSubmit}></button>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: "center",
        alignItems: "center"
    }
})
