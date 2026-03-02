-- 1. Ensure the bucket is created and set to public
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Allow anyone to view/download the images (Public Access)
CREATE POLICY "Public Image Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'product-images' );

-- 3. Allow authenticated sellers to upload images
CREATE POLICY "Sellers can upload images"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'product-images' AND auth.role() = 'authenticated' );

-- 4. Allow sellers to update/delete their own uploaded images
CREATE POLICY "Sellers can manage their own images"
ON storage.objects FOR ALL
USING ( bucket_id = 'product-images' AND auth.uid() = owner );
