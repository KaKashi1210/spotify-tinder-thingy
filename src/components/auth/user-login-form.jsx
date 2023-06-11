import { useState } from "react";

import { cn } from "../../lib/utils";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { Icons } from "../icons";

import { Client, Account } from "appwrite";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";


export function UserLoginForm({ className, ...props }) {
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()

  const onSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)

    api.login(form.email, form.password)
      .then(response => {
        console.log(response)
        navigate('/')
      })
      .catch(error => {
        console.log(error)
      })

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  const googleSession = () => {
    const client = new Client();

    const account = new Account(client);

    client
      .setEndpoint('https://cloud.appwrite.io/v1')
      .setProject('647250ae674a4833cbcf')

    account.createOAuth2Session('google',
      'http://localhost:5173/',
      'http://localhost:5173/login')
  }

  const handleInputChange = (event) => {
    const {
      target = { name, value }
    } = event

    setForm((currState) => ({ ...currState, [target.name]: target.value }))
    console.log(form)
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              name="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              onChange={handleInputChange}
            />
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="password"
              type="password"
              name="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              onChange={handleInputChange}
            />
          </div>
          <Button
            disabled={isLoading || !form.email || !form.password}
          >
            {isLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading} onClick={googleSession} >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}
        Google
      </Button>
    </div>
  )
}
