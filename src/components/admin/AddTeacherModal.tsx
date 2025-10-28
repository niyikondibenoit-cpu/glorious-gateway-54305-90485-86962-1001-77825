import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const teacherSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  personal_email: z.string().email("Invalid email address").optional().or(z.literal("")),
  teacher_id: z.string().min(1, "Teacher ID is required"),
  nationality: z.string().optional(),
  sex: z.enum(["Male", "Female", "Other"]).optional(),
  contactNumber: z.string().optional(),
  subjectsTaught: z.string().min(1, "Please enter subjects taught"),
  classesTaught: z.string().optional(),
  photo_url: z.string().url().optional().or(z.literal("")),
});

type TeacherFormData = z.infer<typeof teacherSchema>;

interface AddTeacherModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function AddTeacherModal({
  open,
  onOpenChange,
  onSuccess,
}: AddTeacherModalProps) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<TeacherFormData>({
    resolver: zodResolver(teacherSchema),
  });

  const onSubmit = async (data: TeacherFormData) => {
    setLoading(true);
    try {
      // Generate a 4-digit password with leading zeros (0001-9999)
      const randomNum = Math.floor(Math.random() * 10000);
      const defaultPassword = randomNum.toString().padStart(4, '0');

      const { error } = await supabase.from("teachers").insert([
        {
          name: data.name,
          email: data.email,
          personal_email: data.personal_email || null,
          teacher_id: data.teacher_id,
          nationality: data.nationality || null,
          sex: data.sex || null,
          contactNumber: data.contactNumber ? parseInt(data.contactNumber) : null,
          subjectsTaught: data.subjectsTaught,
          classesTaught: data.classesTaught || null,
          photo_url: data.photo_url || null,
          default_password: parseInt(defaultPassword),
          is_verified: false,
        },
      ]);

      if (error) throw error;

      toast.success(`Teacher enrolled successfully! Default password: ${defaultPassword}`);
      reset();
      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      console.error("Error adding teacher:", error);
      toast.error(error.message || "Failed to add teacher");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Enroll New Teacher
          </DialogTitle>
          <DialogDescription>
            Add a new teacher to the school system. All fields marked with * are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Full Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                placeholder="John Doe"
                {...register("name")}
                disabled={loading}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="teacher_id">
                Teacher ID <span className="text-destructive">*</span>
              </Label>
              <Input
                id="teacher_id"
                placeholder="TCH001"
                {...register("teacher_id")}
                disabled={loading}
              />
              {errors.teacher_id && (
                <p className="text-sm text-destructive">{errors.teacher_id.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">
                School Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="teacher@school.com"
                {...register("email")}
                disabled={loading}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="personal_email">Personal Email</Label>
              <Input
                id="personal_email"
                type="email"
                placeholder="personal@email.com"
                {...register("personal_email")}
                disabled={loading}
              />
              {errors.personal_email && (
                <p className="text-sm text-destructive">{errors.personal_email.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sex">Gender</Label>
              <Select
                onValueChange={(value) => setValue("sex", value as "Male" | "Female" | "Other")}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nationality">Nationality</Label>
              <Input
                id="nationality"
                placeholder="Country"
                {...register("nationality")}
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactNumber">Contact Number</Label>
            <Input
              id="contactNumber"
              type="tel"
              placeholder="+1234567890"
              {...register("contactNumber")}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subjectsTaught">
              Subjects Taught <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="subjectsTaught"
              placeholder="Mathematics, Physics, Chemistry"
              rows={2}
              {...register("subjectsTaught")}
              disabled={loading}
            />
            {errors.subjectsTaught && (
              <p className="text-sm text-destructive">
                {errors.subjectsTaught.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="classesTaught">Classes Taught</Label>
            <Textarea
              id="classesTaught"
              placeholder="Grade 10A, Grade 11B"
              rows={2}
              {...register("classesTaught")}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="photo_url">Photo URL (Optional)</Label>
            <Input
              id="photo_url"
              type="url"
              placeholder="https://example.com/photo.jpg"
              {...register("photo_url")}
              disabled={loading}
            />
            {errors.photo_url && (
              <p className="text-sm text-destructive">
                {errors.photo_url.message}
              </p>
            )}
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Enroll Teacher
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
