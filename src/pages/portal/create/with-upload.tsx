import { PngImageDropzone } from '@/components/transfers/UploadFiles';
import { useState } from 'react';
import Image from 'next/image';
import { Loader } from '@mantine/core';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';

export { getServerSideProps } from '@/lib/get-server-side-props/authentication';

export default function UploadImages() {
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    return (
        <DashboardLayout pageName="Upload your images">
            <PngImageDropzone setUploadedImages={setUploadedImages} setLoading={setLoading} />
            <div style={{ height: '3rem' }} />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {uploadedImages.map((src, i) => (
                    <div key={src}>
                        <Image height={400} width={400} src={src} alt="wow" />
                    </div>
                ))}
            </div>
            {loading && <Loader />}
        </DashboardLayout>
    );
}
