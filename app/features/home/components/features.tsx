import { ChevronRight } from 'lucide-react';
import { Button } from '~/components/ui/button';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from '~/components/ui/item';
import { featureItems } from '~/constants';
import { cn } from '~/lib/utils';

export default function Features() {
  return (
    <section className={'space-y-4'}>
      <h2 className={'text-4xl font-semibold'}>Need Assistance?</h2>

      <ItemGroup className='w-full flex-row flex-wrap lg:flex-nowrap'>
        {featureItems.map((item) => (
          <Item key={item.id} variant='outline'>
            <ItemMedia
              variant={'image'}
              className={cn('my-auto p-0.5 rounded-full', `${item.bgColor}`)}>
              {item.icon}
            </ItemMedia>
            <ItemContent className='gap-1'>
              <ItemTitle>{item.title}</ItemTitle>
              <ItemDescription>{item.desc}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button variant={'ghost'}>
                <ChevronRight className={'size-4'} />
              </Button>
            </ItemActions>
          </Item>
        ))}
      </ItemGroup>
    </section>
  );
}
