import { redirect } from 'react-router'

export function clientLoader() {
  return redirect('/welcome ')
}

export default function HomeRoute() {
  return (
    <div>
      <h1>Home</h1>
      <p>Redirecting to GameTime...</p>
    </div>
  )
}
