import styled from '@emotion/styled';

import { TimelineCreateButtonGroup } from '@/activities/timeline/components/TimelineCreateButtonGroup';
import { useTimelineActivities } from '@/activities/timeline/hooks/useTimelineActivities';
import { ActivityTargetableObject } from '@/activities/types/ActivityTargetableEntity';
import AnimatedPlaceholder from '@/ui/layout/animated-placeholder/components/AnimatedPlaceholder';
import {
  AnimatedPlaceholderEmptyContainer,
  AnimatedPlaceholderEmptySubTitle,
  AnimatedPlaceholderEmptyTextContainer,
  AnimatedPlaceholderEmptyTitle,
} from '@/ui/layout/animated-placeholder/components/EmptyPlaceholderStyled';
import { useIsMobile } from '@/ui/utilities/responsive/hooks/useIsMobile';

import { TimelineItemsContainer } from './TimelineItemsContainer';

const StyledMainContainer = styled.div`
  align-items: flex-start;
  align-self: stretch;
  border-top: ${({ theme }) =>
    useIsMobile() ? `1px solid ${theme.border.color.medium}` : 'none'};
  display: flex;
  flex-direction: column;
  height: 100%;

  justify-content: center;
`;

export const Timeline = ({
  targetableObject,
}: {
  targetableObject: ActivityTargetableObject;
}) => {
  const { activities, initialized } = useTimelineActivities({
    targetableObject,
  });

  const showEmptyState = initialized && activities.length === 0;

  const showLoadingState = !initialized;

  if (showLoadingState) {
    // TODO: Display a beautiful loading page
    return <></>;
  }

  if (showEmptyState) {
    return (
      <AnimatedPlaceholderEmptyContainer>
        <AnimatedPlaceholder type="emptyTimeline" />
        <AnimatedPlaceholderEmptyTextContainer>
          <AnimatedPlaceholderEmptyTitle>
            Add your first Activity
          </AnimatedPlaceholderEmptyTitle>
          <AnimatedPlaceholderEmptySubTitle>
            There are no activities associated with this record.{' '}
          </AnimatedPlaceholderEmptySubTitle>
        </AnimatedPlaceholderEmptyTextContainer>
        <TimelineCreateButtonGroup targetableObject={targetableObject} />
      </AnimatedPlaceholderEmptyContainer>
    );
  }

  return (
    <StyledMainContainer>
      <TimelineItemsContainer activities={activities} />
    </StyledMainContainer>
  );
};
