/*
 */
package com.sys.util;

import java.io.Serializable;

import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;

/**
 * screen
 * 
 * @author lezu Team
 * @version 3.0
 */
public class Filter implements Serializable {

	private static final long serialVersionUID = -8712382358441065075L;

	/**
	 * operator
	 */
	public enum Operator {

		/** implementsql */
		sql,
		
		/** Be equal to */
		eq,

		/** Not equal */
		ne,

		/** greater than */
		gt,

		/** less than */
		lt,

		/** Greater than or equal to */
		ge,

		/** Less than or equal to */
		le,

		/** Be similar */
		like,

		/** Contain */
		in,
		/** Does not contain */
		notIn,

		/** byNull */
		isNull,

		/** Not forNull */
		isNotNull;

		/**
		 * fromStringGet inOperator
		 * 
		 * @param value
		 *            value
		 * @return StringCorrespondingoperator
		 */
		public static Operator fromString(String value) {
			return Operator.valueOf(value.toLowerCase());
		}
		public String value(){
			switch (this) {
			case sql:
				return " ";
			case eq:
				return " = ";
			case ne:
				return " != ";
			case gt:
				return " > ";
			case lt:
				return " < ";
			case ge:
				return " >= ";
			case le:
				return " <= ";
			case like:
				return " like ";
			case in:
				return " in ";
			case notIn:
				return " not in ";
			case isNull:
				return " is null ";
			case isNotNull:
				return " is not null ";
			default:
				return "=";
			}
		}
	}

	/** Default ignore case */
	private static final boolean DEFAULT_IGNORE_CASE = false;

	/** attribute */
	private String property;

	/** operator */
	private Operator operator;

	/** value */
	private Object value;

	/** Ignore case */
	private Boolean ignoreCase = DEFAULT_IGNORE_CASE;

	/**
	 * Initialize a newly createdFilterobject
	 */
	public Filter() {
	}

	/**
	 * Initialize a newly createdFilterobject
	 * 
	 * @param property
	 *            attribute
	 * @param operator
	 *            operator
	 * @param value
	 *            value
	 */
	public Filter(String property, Operator operator, Object value) {
		this.property = property;
		this.operator = operator;
		this.value = value;
	}
	public Filter(String property, Object value) {
		this.property = property;
		this.operator = Operator.eq;
		this.value = value;
	}

	/**
	 * Initialize a newly createdFilterobject
	 * 
	 * @param property
	 *            attribute
	 * @param operator
	 *            operator
	 * @param value
	 *            value
	 * @param ignoreCase
	 *            ignore case
	 */
	public Filter(String property, Operator operator, Object value, boolean ignoreCase) {
		this.property = property;
		this.operator = operator;
		this.value = value;
		this.ignoreCase = ignoreCase;
	}

	/**
	 * Returns equal to filter
	 * 
	 * @param property
	 *            attribute
	 * @param value
	 *            value
	 * @return Equal screening
	 */
	public static Filter eq(String property, Object value) {
		return new Filter(property, Operator.eq, value);
	}

	/**
	 * Returns equal to filter
	 * 
	 * @param property
	 *            attribute
	 * @param value
	 *            value
	 * @param ignoreCase
	 *            ignore case
	 * @return Equal screening
	 */
	public static Filter eq(String property, Object value, boolean ignoreCase) {
		return new Filter(property, Operator.eq, value, ignoreCase);
	}

	/**
	 * Return is not equal to filter
	 * 
	 * @param property
	 *            attribute
	 * @param value
	 *            value
	 * @return Not equal to screening
	 */
	public static Filter ne(String property, Object value) {
		return new Filter(property, Operator.ne, value);
	}

	/**
	 * Return is not equal to filter
	 * 
	 * @param property
	 *            attribute
	 * @param value
	 *            value
	 * @param ignoreCase
	 *            ignore case
	 * @return Not equal to screening
	 */
	public static Filter ne(String property, Object value, boolean ignoreCase) {
		return new Filter(property, Operator.ne, value, ignoreCase);
	}

	/**
	 * Return greater than filter
	 * 
	 * @param property
	 *            attribute
	 * @param value
	 *            value
	 * @return Greater than screening
	 */
	public static Filter gt(String property, Object value) {
		return new Filter(property, Operator.gt, value);
	}

	/**
	 * Return less than filter
	 * 
	 * @param property
	 *            attribute
	 * @param value
	 *            value
	 * @return Less than screening
	 */
	public static Filter lt(String property, Object value) {
		return new Filter(property, Operator.lt, value);
	}

	/**
	 * Return is greater than or equal to the filter
	 * 
	 * @param property
	 *            attribute
	 * @param value
	 *            value
	 * @return Greater than or equal to the filter
	 */
	public static Filter ge(String property, Object value) {
		return new Filter(property, Operator.ge, value);
	}

	/**
	 * Returns less than equal to filter
	 * 
	 * @param property
	 *            attribute
	 * @param value
	 *            value
	 * @return Less than or equal to the filter
	 */
	public static Filter le(String property, Object value) {
		return new Filter(property, Operator.le, value);
	}

	/**
	 * Return similar filter
	 * 
	 * @param property
	 *            attribute
	 * @param value
	 *            value
	 * @return Similar screening
	 */
	public static Filter like(String property, Object value) {
		return new Filter(property, Operator.like, value);
	}

	/**
	 * Return contains filter
	 * 
	 * @param property
	 *            attribute
	 * @param value
	 *            value
	 * @return Include filter
	 */
	public static Filter in(String property, Object value) {
		return new Filter(property, Operator.in, value);
	}

	/**
	 * Return asNullscreen
	 * 
	 * @param property
	 *            attribute
	 * @return byNullscreen
	 */
	public static Filter isNull(String property) {
		return new Filter(property, Operator.isNull, null);
	}

	/**
	 * Return not forNullscreen
	 * 
	 * @param property
	 *            attribute
	 * @return Not forNullscreen
	 */
	public static Filter isNotNull(String property) {
		return new Filter(property, Operator.isNotNull, null);
	}

	/**
	 * Return ignore case filter
	 * 
	 * @return Ignore case selection
	 */
	public Filter ignoreCase() {
		this.ignoreCase = true;
		return this;
	}

	/**
	 * get attribute
	 * 
	 * @return attribute
	 */
	public String getProperty() {
		return property;
	}

	/**
	 * set a property
	 * 
	 * @param property
	 *            attribute
	 */
	public void setProperty(String property) {
		this.property = property;
	}

	/**
	 * Get operator
	 * 
	 * @return operator
	 */
	public Operator getOperator() {
		return operator;
	}

	/**
	 * Set operator
	 * 
	 * @param operator
	 *            operator
	 */
	public void setOperator(Operator operator) {
		this.operator = operator;
	}

	/**
	 * Get value
	 * 
	 * @return value
	 */
	public Object getValue() {
		return value;
	}

	/**
	 * Set value
	 * 
	 * @param value
	 *            value
	 */
	public void setValue(Object value) {
		this.value = value;
	}

	/**
	 * Gets whether to ignore case size
	 * 
	 * @return Ignore case
	 */
	public Boolean getIgnoreCase() {
		return ignoreCase;
	}

	/**
	 * Set whether to ignore case
	 * 
	 * @param ignoreCase
	 *            Ignore case
	 */
	public void setIgnoreCase(Boolean ignoreCase) {
		this.ignoreCase = ignoreCase;
	}

	@Override
	public boolean equals(Object obj) {
		if (obj == null) {
			return false;
		}
		if (getClass() != obj.getClass()) {
			return false;
		}
		if (this == obj) {
			return true;
		}
		Filter other = (Filter) obj;
		return new EqualsBuilder().append(getProperty(), other.getProperty()).append(getOperator(), other.getOperator()).append(getValue(), other.getValue()).isEquals();
	}

	@Override
	public int hashCode() {
		return new HashCodeBuilder(17, 37).append(getProperty()).append(getOperator()).append(getValue()).toHashCode();
	}

}