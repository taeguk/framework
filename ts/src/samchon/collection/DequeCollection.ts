﻿/// <reference path="../API.ts" />

namespace samchon.collection
{
	/**
	 * A {@link Deque} who can detect element I/O events.
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class DequeCollection<T>
		extends std.Deque<T>
		implements ICollection<T>
	{
		/**
		 * A callback function listening elements insertion.
		 */
		private insert_handler_: CollectionHandler<T> = null;

		/**
		 * A callback function listening elements deletion.
		 */
		private erase_handler_: CollectionHandler<T> = null;

		/**
		 * A chain object taking responsibility of dispatching events.
		 */
		private event_dispatcher_: library.EventDispatcher = new library.EventDispatcher(this);

		/* =========================================================
			CONSTRUCTORS & ACCESSORS
		============================================================
			CONSTRUCTORS
		--------------------------------------------------------- */
		// using super::constructor

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public set_insert_handler(listener: CollectionHandler<T>)
		{
			this.insert_handler_ = listener;
		}

		/**
		 * @inheritdoc
		 */
		public set_erase_handler(listener: CollectionHandler<T>)
		{
			this.erase_handler_ = listener;
		}

		/**
		 * @inheritdoc
		 */
		public get_insert_handler(): CollectionHandler<T>
		{
			return this.insert_handler_;
		}

		/**
		 * @inheritdoc
		 */
		public get_erase_handler(): CollectionHandler<T>
		{
			return this.erase_handler_;
		}

		/* =========================================================
			ELEMENTS I/O
				- INSERT
				- ERASE
				- NOTIFIER
		============================================================
			INSERT
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public push<U extends T>(...items: U[]): number
		{
			let ret = super.push(...items);

			this.notify_insert(this.end().advance(-items.length), this.end());

			return ret;
		}

		/**
		 * @inheritdoc
		 */
		public push_back(val: T): void
		{
			super.push(val);

			this.notify_insert(this.end().prev(), this.end());
		}

		/**
		 * @hidden
		 */
		protected insert_by_repeating_val(position: std.DequeIterator<T>, n: number, val: T): std.DequeIterator<T>
		{
			let ret = super.insert_by_repeating_val(position, n, val);

			this.notify_insert(ret, ret.advance(n));

			return ret;
		}

		/**
		 * @hidden
		 */
		protected insert_by_range<U extends T, InputIterator extends std.Iterator<U>>
			(position: std.DequeIterator<T>, begin: InputIterator, end: InputIterator): std.DequeIterator<T>
		{
			let n: number = this.size();

			let ret = super.insert_by_range(position, begin, end);
			n = this.size() - n;

			this.notify_insert(ret, ret.advance(n));

			return ret;
		}

		/* ---------------------------------------------------------
			ERASE
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public pop_back(): void
		{
			this.notify_erase(this.end().prev(), this.end());

			super.pop_back();
		}

		/**
		 * @hidden
		 */
		protected erase_by_range(first: std.DequeIterator<T>, last: std.DequeIterator<T>): std.DequeIterator<T>
		{
			this.notify_erase(first, last);

			return super.erase_by_range(first, last);
		}

		/* ---------------------------------------------------------
			NOTIFIER
		--------------------------------------------------------- */
		/**
		 * @hidden
		 */
		private notify_insert(first: std.DequeIterator<T>, last: std.DequeIterator<T>): void
		{
			if (this.insert_handler_ != null)
				this.insert_handler_(first, last);

			this.dispatchEvent(new CollectionEvent(CollectionEvent.INSERT, first, last));
		}

		/**
		 * @hidden
		 */
		private notify_erase(first: std.DequeIterator<T>, last: std.DequeIterator<T>): void
		{
			if (this.erase_handler_ != null)
				this.erase_handler_(first, last);

			this.dispatchEvent(new CollectionEvent(CollectionEvent.ERASE, first, last));
		}

		/* =========================================================
			EVENT_DISPATCHER
				- ACCESSORS
				- ADD
				- REMOVE
		============================================================
			ACCESSORS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public hasEventListener(type: string): boolean 
		{
			return this.event_dispatcher_.hasEventListener(type);
		}

		/**
		 * @inheritdoc
		 */
		public dispatchEvent(event: Event): boolean
		{
			return this.event_dispatcher_.dispatchEvent(event);
		}

		/* ---------------------------------------------------------
			ADD
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public addEventListener(type: string, listener: EventListener): void;

		/**
		 * @inheritdoc
		 */
		public addEventListener(type: string, listener: EventListener, thisArg: Object): void;

		/**
		 * @inheritdoc
		 */
		public addEventListener(type: "insert" | "erase", listener: CollectionEventListener<T>): void;

		/**
		 * @inheritdoc
		 */
		public addEventListener(type: "insert" | "erase", listener: CollectionEventListener<T>, thisArg: Object): void;

		public addEventListener(type: string, listener: EventListener, thisArg: Object = null): void
		{
			this.event_dispatcher_.addEventListener(type, listener, thisArg);
		}

		/* ---------------------------------------------------------
			REMOVE
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public removeEventListener(type: string, listener: EventListener): void;

		/**
		 * @inheritdoc
		 */
		public removeEventListener(type: string, listener: EventListener, thisArg: Object): void;

		/**
		 * @inheritdoc
		 */
		public removeEventListener(type: "insert" | "erase", listener: CollectionEventListener<T>): void;

		/**
		 * @inheritdoc
		 */
		public removeEventListener(type: "insert" | "erase", listener: CollectionEventListener<T>, thisArg: Object): void;

		public removeEventListener(type: string, listener: EventListener, thisArg: Object = null): void
		{
			this.event_dispatcher_.removeEventListener(type, listener, thisArg);
		}
	}
}