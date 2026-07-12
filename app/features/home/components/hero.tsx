import { FlaskConicalIcon, GlassesIcon, PackageOpenIcon } from 'lucide-react';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from '~/components/ui/input-group';

export default function Hero() {
  return (
    <section
      className={
        'grid grid-cols-1 lg:grid-cols-2 place-items-center gap-4 relative aspect-square sm:aspect-14/9 md:aspect-video lg:aspect-20/9 xl:aspect-24/9'
      }>
      <div className={'w-full h-full absolute top-0 left-0'}>
        <img
          src='/hero-bg.png'
          alt='hero-bg'
          width={'100%'}
          height={'100%'}
          className={'w-full h-full object-cover'}
        />
      </div>
      <Card className='z-10 bg-background/10 backdrop-blur-xs border-none ring-0 shadow-none rounded-none border-0 h-full justify-center scroll-fade-e'>
        <CardHeader>
          <CardTitle>
            <h1 className={'text-5xl font-semibold text-destructive'}>
              Bengaluru's Trusted partner for Diagnostic Care
            </h1>
          </CardTitle>
        </CardHeader>
        <CardContent className={'space-y-4'}>
          <CardDescription>
            <p className={'text-lg font-medium'}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Veritatis illum inventore voluptatum id tenetur rerum ex
              laboriosam in ducimus incidunt veniam qui expedita quia, atque
              ipsa dolor vel eum debitis.
            </p>
          </CardDescription>

          <InputGroup>
            <InputGroupInput placeholder='Search tests, packages or health checkups' />
            <InputGroupAddon align={'inline-end'}>
              <InputGroupButton type='button'>
                <InputGroupText>Search</InputGroupText>
                <GlassesIcon className={'size-4'} />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          <div className={'flex flex-wrap items-center gap-2'}>
            <p>Popular search:</p>

            <div className={'flex items-center gap-1'}>
              <Badge variant={'secondary'}>CBC</Badge>
              <Badge variant={'secondary'}>Diabetes</Badge>
              <Badge variant={'secondary'}>Thyroid</Badge>
              <Badge variant={'secondary'}>Vitamin D</Badge>
            </div>
          </div>

          <CardAction className={'space-x-2 justify-self-start'}>
            <Button type='button'>
              <FlaskConicalIcon className='size-4' /> Book a Test
            </Button>
            <Button type='button' variant={'outline'}>
              <PackageOpenIcon className='size-4' />
              Explore Packages
            </Button>
          </CardAction>
        </CardContent>
      </Card>

      <div className={'z-10 hidden lg:block'}>&nbsp;</div>
    </section>
  );
}
