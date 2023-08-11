import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';

interface Login{
    username:string
    password:string
    error:string
}

export const useForm = routeLoader$(() => {
    return{
        username:'',
        password:'',
        error:''
    } as Login
})


export default component$(() => {

  return (
    <form method="POST">
        <label>username</label>
        <input name="username" type='text' />
        <label>password</label>
        <input name="password" type='password' />
    </form>
  )
});
