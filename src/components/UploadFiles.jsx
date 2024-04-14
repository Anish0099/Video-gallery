import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function DialogDemo({ setTitle, handleTitle, title }) {




    const submitForm = (e) => {
        e.preventDefault();

    }

    async function handlesubmit(formData) {


        console.log(formData.get('title'))
        const response = await fetch('/api/video', {
            method: 'POST',
            body: formData,
        })



    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Upload Video</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you &apos; re done.
                    </DialogDescription>
                </DialogHeader>
                <form action={handlesubmit} >
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Title
                            </Label>
                            <Input onChange={handleTitle} type="text" id="title"
                                name="title" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Video
                            </Label>
                            <Input type="file" id="username" name="file" value="" className="col-span-3" />
                        </div>
                    </div>
                    <div className="w-full flex justify-end">
                        <Button type="submit">Save changes</Button>
                    </div>
                </form>

            </DialogContent>
        </Dialog>
    )
}
