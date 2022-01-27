import { Observable, Subscription } from 'rxjs';

export function setSubscription(
	localSubscription: Subscription,
	observable: Observable<any>,
	observer: any,
	callbackFunc?: Function
): void {
	localSubscription = observable.subscribe((value: any) => {
		observer = value

		if (callbackFunc) {
			callbackFunc(value)
		}
	})
}
