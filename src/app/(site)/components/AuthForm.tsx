'use client';

import Input from "@/app/components/inputs/Input";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState(false);

    // Set up toggle for login/register
    const toggleVariant = useCallback(() => {
        
        if (variant === 'LOGIN') {
            setVariant('REGISTER')
        } else {
            setVariant('LOGIN')
        }
    }, [variant]);

    // Set up form
    const {
        register, 
        handleSubmit,
        formState: { errors }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        if (variant === 'REGISTER') {
            // Axios call to register
        }
        if (variant === 'LOGIN') {
            // NextAuth call to login
        }
    }

    const  socialAction = (action: string) => {
        setIsLoading(true)

        // Social login
    }


    return ( 

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div 
          className="
          bg-white
            px-4
            py-8
            shadow
            sm:rounded-lg
            sm:px-10
          "
        >
          <form 
            className="space-y-6" 
            onSubmit={handleSubmit(onSubmit)}
          >
            {variant === 'REGISTER' && (
              <Input
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                id="name" 
                label="Name"
              />
            )}
            <Input 
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id="email" 
              label="Email address" 
              type="email"
            />
            <Input 
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id="password" 
              label="Password" 
              type="password"
            />
            <div>
              {/* <Button disabled={isLoading} fullWidth type="submit">
                {variant === 'LOGIN' ? 'Sign in' : 'Register'}
              </Button> */}
            </div>
          </form>
  
          <div className="mt-6">
            <div className="relative">
              <div 
                className="
                  absolute 
                  inset-0 
                  flex 
                  items-center
                "
              >
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>
  
            <div className="mt-6 flex gap-2">
              {/* <AuthSocialButton 
                icon={BsGithub} 
                onClick={() => socialAction('github')} 
              />
              <AuthSocialButton 
                icon={BsGoogle} 
                onClick={() => socialAction('google')} 
              /> */}
            </div>
          </div>
          <div 
            className="
              flex 
              gap-2 
              justify-center 
              text-sm 
              mt-6 
              px-2 
              text-gray-500
            "
          >
            <div>
              {variant === 'LOGIN' ? 'New to Groups?' : 'Already have an account?'} 
            </div>
            <div 
              onClick={toggleVariant} 
              className="underline cursor-pointer"
            >
              {variant === 'LOGIN' ? 'Create an account' : 'Login'}
            </div>
          </div>
        </div>
      </div>
    );
  }


export default AuthForm;