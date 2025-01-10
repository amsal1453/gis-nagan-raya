export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={
                `block text-sm font-bold text-primary  ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
