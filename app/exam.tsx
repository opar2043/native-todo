import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

export default function exam() {
    const [emails, setEmail] = useState("");
    const [passwords, setPassword] = useState("");
    const [err , setErr] = useState("");
    function handleSubmit(){
      if(!emails){
        setErr("Email is required");
        return;
      }
      if(!emails.includes("@")){
        setErr("Please enter a valid email");
        return;
      }
      if(!passwords || passwords.length < 5){
        setErr("Password must be at least 5 characters long");
        return;
      }
      if(!passwords){
        setErr("Password is required");
        return;
      }
        const obj = {
            emails , passwords
        }
        console.log(obj);
    }
    
  return (
    <View className='max-w-lg  mx-auto flex gap-4'>
        <h2 className='font-bold text-xl mt-3'>Login Form</h2>
        {/* start */}
      <View>
        <TextInput 

         placeholder='Write Email ...'
         className='p-2 bg-gray-400'
         value={emails}
         onChangeText={(text) => setEmail(text)}
        />
      </View>
      {/* finished */}
      <View>
        <TextInput 
         placeholder='Write Password ...'
         className='p-2 mt-3 bg-gray-100'
     
         value={passwords}
         onChangeText={setPassword}
         secureTextEntry
        />
      </View>
{    err &&  <View>
        <Text className='text-red-500'>{err}</Text>
      </View>}
      <TouchableOpacity onPress={handleSubmit} className='bg-blue-700 p-3 mt-3 rounded-md text-white'>
        <Text className='text-white'>Sign In</Text>
      </TouchableOpacity>
    </View>
  )
}