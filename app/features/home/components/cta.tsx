import { Card, CardContent } from '~/components/ui/card';

export default function CTA() {
  return (
    <section>
      <Card className={'p-0'}>
        <CardContent className={'p-0'}>
          <img
            src='/cta.png'
            alt='cta-bg'
            width={'100%'}
            height={'100%'}
            className={'w-full h-full'}
          />
        </CardContent>
      </Card>
    </section>
  );
}
