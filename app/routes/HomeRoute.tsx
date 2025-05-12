import { redirect } from 'react-router'

export function clientLoader() {
  return redirect('/in_game')
}

export default function HomeRoute() {
  return (
    <div>
      <h1>Home</h1>
      <p>Redirecting to game time...</p>
    </div>
  )
}
