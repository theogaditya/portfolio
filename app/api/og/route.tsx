// app/api/og/route.tsx
import { ImageResponse } from 'next/og';
 
export const runtime = 'edge';
 
export async function GET() {
  try {
    // Font
    const interSemiBold = fetch(
      new URL('../../../public/fonts/Inter-SemiBold.ttf', import.meta.url)
    ).then((res) => res.arrayBuffer());
    
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1E293B', // Dark blue background
            padding: 40,
            fontFamily: '"Inter"',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 40,
            }}
          >
            {/* You can add a logo or profile image here */}
            <div
              style={{
                width: 150,
                height: 150,
                borderRadius: '50%',
                backgroundColor: '#3B82F6', // Blue accent
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: 72,
                fontWeight: 700,
              }}
            >
              AH
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <h1
              style={{
                fontSize: 64,
                fontWeight: 700,
                color: 'white',
                margin: 0,
                marginBottom: 16,
                textAlign: 'center',
              }}
            >
              Aditya Hota
            </h1>
            <h2
              style={{
                fontSize: 36,
                fontWeight: 600,
                color: '#94A3B8', // Light gray
                margin: 0,
                marginBottom: 32,
                textAlign: 'center',
              }}
            >
              Full Stack Developer & DevOps Engineer
            </h2>
            <div
              style={{
                display: 'flex',
                gap: 16,
                marginTop: 24,
              }}
            >
              {['React', 'Node.js', 'Docker', 'Kubernetes'].map((tech) => (
                <div
                  key={tech}
                  style={{
                    backgroundColor: '#334155', // Slate 700
                    color: '#CBD5E1', // Slate 300
                    padding: '8px 16px',
                    borderRadius: 8,
                    fontSize: 24,
                  }}
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 40,
              fontSize: 24,
              color: '#94A3B8',
            }}
          >
            adityahota.online
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: await interSemiBold,
            style: 'normal',
            weight: 600,
          },
        ],
      },
    );
  } catch (e:any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}