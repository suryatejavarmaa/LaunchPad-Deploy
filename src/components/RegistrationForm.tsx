import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'motion/react';
import { CheckCircle, Loader2, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from './ui/form';
import ElectricBorder from './ui/electric-border';

interface RegistrationFormData {
    name: string;
    email: string;
    linkedin: string;
    motivation: string;
}

export function RegistrationForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const form = useForm<RegistrationFormData>({
        defaultValues: {
            name: '',
            email: '',
            linkedin: '',
            motivation: '',
        },
    });

    const onSubmit = async (data: RegistrationFormData) => {
        setIsSubmitting(true);
        // Simulate API call
        console.log('Form Data:', data);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSuccess(true);
    };

    if (isSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md mx-auto p-8 rounded-2xl bg-slate-950/50 border border-green-500/20 text-center"
            >
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Application Received!</h3>
                <p className="text-slate-400">
                    Thank you for applying to Launchpad. We'll be in touch with you shortly.
                </p>
                <Button
                    variant="outline"
                    className="mt-6 border-white/10 text-white hover:bg-white/5"
                    onClick={() => setIsSuccess(false)} // Optional: Reset form
                >
                    Submit Another Application
                </Button>
            </motion.div>
        );
    }

    return (
        <ElectricBorder
            color="#3b82f6"
            speed={0.4}
            className="w-full max-w-md mx-auto"
        >
            <div className="p-6 md:p-8 bg-slate-950/90 backdrop-blur-xl rounded-xl">
                <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white">Join the Cohort</h3>
                    <p className="text-slate-400 text-sm">Limited spots available for the upcoming batch.</p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            rules={{ required: 'Name is required' }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-300">Full Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="John Doe"
                                            {...field}
                                            className="bg-slate-900/50 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-blue-500/50"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            rules={{
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-300">Email Address</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="john@example.com"
                                            {...field}
                                            type="email"
                                            className="bg-slate-900/50 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-blue-500/50"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="linkedin"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-300">LinkedIn URL (Optional)</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="https://linkedin.com/in/..."
                                            {...field}
                                            className="bg-slate-900/50 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-blue-500/50"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="motivation"
                            rules={{ required: 'Please share your motivation' }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-300">Why do you want to join?</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="I want to build..."
                                            {...field}
                                            className="bg-slate-900/50 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-blue-500/50"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-6"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </Button>
                    </form>
                </Form>
            </div>
        </ElectricBorder>
    );
}
