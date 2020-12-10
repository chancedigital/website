export class Emitter {
	private _callbacks: Record<string, ((...args: any[]) => any)[]>;

	on(event: string, fn: (...args: any[]) => any) {
		this._callbacks = this._callbacks || {};
		(this._callbacks["$" + event] = this._callbacks["$" + event] || []).push(
			fn
		);
		return this;
	}

	once(event: string, fn: (...args: any[]) => any): this {
		function on() {
			this.off(event, on);
			fn.apply(this, arguments);
		}

		on.fn = fn;
		this.on(event, on);
		return this;
	}

	off(event: string, fn: (...args: any[]) => any): this {
		this._callbacks = this._callbacks || {};

		// all
		if (0 == arguments.length) {
			this._callbacks = {};
			return this;
		}

		// specific event
		let callbacks = this._callbacks["$" + event];
		if (!callbacks) {
			return this;
		}

		// remove all handlers
		if (1 == arguments.length) {
			delete this._callbacks["$" + event];
			return this;
		}

		// remove specific handler
		let cb;
		for (let i = 0; i < callbacks.length; i++) {
			cb = callbacks[i];
			if (cb === fn || cb.fn === fn) {
				callbacks.splice(i, 1);
				break;
			}
		}

		// Remove event specific arrays for event types that no one is subscribed
		// for to avoid memory leak.
		if (callbacks.length === 0) {
			delete this._callbacks["$" + event];
		}

		return this;
	}

	emit(event: string): this {
		this._callbacks = this._callbacks || {};
		let args = [].slice.call(arguments, 1);
		let callbacks = this._callbacks["$" + event];

		if (callbacks) {
			callbacks = callbacks.slice(0);
			for (let i = 0, len = callbacks.length; i < len; ++i) {
				callbacks[i].apply(this, args);
			}
		}

		return this;
	}

	listeners(event: string): EmitterCallback[] {
		this._callbacks = this._callbacks || {};
		return this._callbacks["$" + event] || [];
	}

	hasListeners(event: string) {
		return !!this.listeners(event).length;
	}
}

export type EmitterCallback =
	| ((...args: any[]) => any)
	| { fn: (...args: any[]) => any };
