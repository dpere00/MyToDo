import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from './constants/Colors';
import Home from "./screens/Home";
import ToDo from "./screens/ToDo";


const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name ="ToDo List App" component={ Home } />
        <Stack.Screen 
        name ="My ToDo List" 
        component={ ToDo }
        options ={ ({route}) => {
          return({
              title: route.params.title,
              headerStyle: {
                backgroundColor: route.params.color
              },
              headerTintColor:"white"
          })
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
};
