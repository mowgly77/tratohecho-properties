-- Fix 0028/0029: prevent direct API execution of the SECURITY DEFINER has_role function.
-- RLS policies that reference this function continue to work, because RLS policy
-- evaluation does not require the calling role to hold EXECUTE on the function.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon, authenticated, PUBLIC;

-- Fix 0025: remove the broad public SELECT policy that allows listing all files in the
-- public property-images bucket. Public file URLs still resolve (public buckets bypass
-- RLS for direct object reads), but clients can no longer enumerate the bucket contents.
DROP POLICY IF EXISTS "Anyone can view property images" ON storage.objects;