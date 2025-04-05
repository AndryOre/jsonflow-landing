import { ArrowRightIcon } from '@radix-ui/react-icons';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface BentoGridProps extends ComponentPropsWithoutRef<'div'> {
	children: ReactNode;
	className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<'div'> {
	name: string;
	className?: string;
	background?: ReactNode;
	Icon: React.ElementType;
	description: string;
	href?: string;
	cta?: string;
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
	return (
		<div
			className={cn(
				'grid w-full auto-rows-[22rem] grid-cols-3 gap-4',
				className
			)}
			{...props}>
			{children}
		</div>
	);
};

const BentoCard = ({
	name,
	className,
	background,
	Icon,
	description,
	href,
	cta,
	...props
}: BentoCardProps) => (
	<div
		key={name}
		className={cn(
			'group relative col-span-3 flex flex-col overflow-hidden rounded-xl',
			background ? 'justify-between' : 'justify-end',
			// light styles
			'bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
			// dark styles
			'transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]',
			className
		)}
		{...props}>
		{background && <div>{background}</div>}
		<div
			className={cn(
				'pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6',
				background || (href && cta)
					? 'transition-all duration-300 group-hover:-translate-y-10'
					: ''
			)}>
			<Icon
				className={cn(
					'h-12 w-12 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out ',
					href && cta ? 'group-hover:scale-75' : ''
				)}
			/>
			<h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
				{name}
			</h3>
			<p className="max-w-lg text-neutral-400">{description}</p>
		</div>

		{(href || cta) && (
			<div
				className={cn(
					'pointer-events-none absolute bottom-0 flex w-full transform-gpu flex-row items-center p-4',
					'translate-y-10 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100'
				)}>
				{href && cta && (
					<Button
						variant="ghost"
						asChild
						size="sm"
						className="pointer-events-auto">
						<a href={href}>
							{cta}
							<ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180" />
						</a>
					</Button>
				)}
			</div>
		)}
		<div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
	</div>
);

export { BentoCard, BentoGrid };
