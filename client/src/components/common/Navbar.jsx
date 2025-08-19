import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { LogOut, User2 } from 'lucide-react'
import { Link } from "react-router-dom";

const Navbar = () => {
    const user = false;
    return (
        <div className="bg-white border-b border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
                <div>
                    <h1 className="text-2xl font-bold">Job <span className="text-[#f83002]">Portal</span></h1>
                </div>
                <div className="flex items-center gap-12">
                    <ul className="flex font-medium items-center gap-5">
                        <Link to="/">
                            <li>Home</li>
                        </Link>
                        <Link to="/jobs">
                            <li>Jobs</li>
                        </Link>
                        <Link to="/browse">
                            <li>Browse</li>
                        </Link>
                    </ul>
                    {!user ? ( 
                        <div className="flex items-center gap-4">
                            <Link to="/login">
                                <Button variant="outline">Login</Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-[#f83002] text-white hover:bg-[#c42701]">Signup</Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                        <PopoverTrigger asChild>
                            <Avatar className="h-10 w-10 rounded-full border-2 border-gray-200 hover:border-[#f83002] cursor-pointer transition-colors">
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className="rounded-full" />
                            </Avatar>
                        </PopoverTrigger>
                        <PopoverContent className="w-64 p-4" align="end">
                            <div>
                                <div className="flex items-center gap-4 space-y-2">
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className="rounded-full h-10 w-10" />
                                    </Avatar>
                                    <div>
                                        <h4 className="text-sm font-medium">Akshay Pratap Singh</h4>
                                        <p className="text-xs text-gray-500">Full Stack Developer</p>
                                    </div>
                                </div>
                                <div className="flex flex-col my-2 text-gray-600">
                                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                                        <User2 />
                                        <Button variant='link'>View Profile</Button>
                                    </div>
                                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                                        <LogOut />
                                        <Button variant='link'>Logout</Button>
                                    </div>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar;