import { useMutation } from '@tanstack/react-query'
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { getAuthStatus, login } from '@/server/auth'

export const Route = createFileRoute('/productions/login/')({
  component: RouteComponent,
  beforeLoad: async () => {
    const auth = await getAuthStatus();
    if (auth.locked) {
      throw redirect({
        to: '/productions',
      });
    } else if (auth.authenticated) {
      throw redirect({
        to: '/productions/edit',
      });
    }
  }
})

type FormData = {
  password: string;
}

function RouteComponent() {
  const router = useNavigate();
  const { register, handleSubmit } = useForm<FormData>();

  const loginMutation = useMutation({
    mutationFn: login,
    onError: () => {
      alert('Login failed. Please check your credentials.');
    },
    onSuccess: () => {
      router({ to: '/productions/edit' });
    },
  });

  const onSubmit = (data: FormData) => {
    loginMutation.mutate({ data });
  };

  return (
    <main className="mt-16">
      <h1 className="text-2xl font-bold text-center">Login Page</h1>
      <form
        className="max-w-md mx-auto mt-8 flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register('password', { required: true })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          {loginMutation.isPending ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </main>
  );



}
